import itertools
import matplotlib.pyplot as plt
import numpy as np
import base64
import io
import time
from datetime import date
import GPy


class NeuroAlgorithmPrediction:

    positions = None
    n_Chan = 0
    NextQuery = None

    def __init__(self) -> None:
        self.mKernel = 5  # Matern kernel order
        self.noise_min = 0.0001
        self.kappa = 5
        self.rho_high = 5
        self.rho_low = 0.02
        self.nrnd = 1  # has to be >= 1
        self.noise_max = 0.05
        np.random.seed(0)

    def generate_space(self, dimention, n_param):
        self.dimention = dimention
        self.n_param = n_param
        tab = []
        for i in range(dimention):
            tab.append(i)

        space = []
        for i in range(n_param):
            space.append(tab)

        positions = list(itertools.product(*space))

        self.positions = np.array(positions)
        self.n_Chan = len(self.positions)

        # Create the kernel
        # Put a  prior on the two lengthscale hyperparameters and the variance
        self.matk = GPy.kern.Matern52(
            input_dim=2, variance=1.0, lengthscale=[1.0, 1.0], ARD=True, name="Mat52"
        )
        self.matk.variance.set_prior(
            GPy.priors.Uniform(0.01**2, 100**2), warning=False
        )
        self.matk.lengthscale.set_prior(
            GPy.priors.Uniform(self.rho_low, self.rho_high), warning=False
        )

        # Then run the sequential optimization
        self.DimSearchSpace = self.n_Chan
        self.MaxQueries = self.DimSearchSpace
        self.P_test = np.zeros((self.DimSearchSpace, 2))  # storing all queries
        self.q = 0  # query number
        self.hyp = [1.0, 1.0, 1.0, 1.0]  # initialize kernel hyperparameters
        self.P_max = []
        self.mean_function = GPy.core.Mapping(input_dim=2, output_dim=1)
        self.mean_function.update_gradients = lambda a, b: None

    def execute_query(self, x_chan, BO_reward):
        if self.q < 100:
            # We will sample the search space randomly for exactly nrnd queries
            self.P_test[self.q][0] = x_chan
            self.query_elec = self.P_test[self.q][0]
            # print("next querry " + str(self.q))

            # SEND THIS TO CLINICIAN
            # RECEIVE RESPONSE

            # noisy response
            self.BO_reward = BO_reward
            # done reading response

            self.P_test[self.q][1] = self.BO_reward
            # The first element of P_test is the selected search
            # space point, the second the resulting value

            self.x = self.positions[
                self.P_test[: self.q + 1, 0].astype(int), :
            ]  # search space position
            self.y = self.P_test[: self.q + 1, 1]  # test result
            self.y = self.y.reshape((len(self.y), 1))

            # Update the initial value of the parameters
            self.matk.variance = self.hyp[2]
            self.matk.lengthscale[0] = self.hyp[0]
            self.matk.lengthscale[1] = self.hyp[1]

            # Initialization of the model and the constraint of the Gaussian noise
            if self.q == 0:
                # m=GPy.models.GPRegression(x,y, kernel= matk, normalizer=None, noise_var=hyp[3])
                self.m = GPy.models.GPRegression(
                    self.x,
                    self.y,
                    kernel=self.matk,
                    normalizer=None,
                    noise_var=self.hyp[3],
                )
                self.m.Gaussian_noise.constrain_bounded(
                    self.noise_min**2, self.noise_max**2, warning=False
                )
            else:
                self.m.set_XY(self.x, self.y)
                self.m.Gaussian_noise.variance[0] = self.hyp[3]

            # GP-BO optimization
            self.m.optimize(
                optimizer="scg",
                start=None,
                messages=False,
                max_iters=10,
                ipython_notebook=True,
                clear_after_finish=True,
            )

            self.X_test = self.positions
            self.ymu, self.ys2 = self.m.predict(
                self.X_test, full_cov=False, Y_metadata=None, include_likelihood=True
            )

            # We only test for gp predictions at electrodes that
            # we had queried (presumable we only want to return an
            # electrode that we have already queried).
            self.Tested = np.unique(self.P_test[: self.q + 1, 0].astype(int))
            self.MapPredictionTested = self.ymu[self.Tested]

            self.BestQuery = self.Tested[
                (self.MapPredictionTested == np.max(self.MapPredictionTested)).reshape(
                    len(self.MapPredictionTested)
                )
            ]

            if len(self.BestQuery) > 1:
                self.BestQuery = np.array(
                    [self.BestQuery[np.random.randint(len(self.BestQuery))]]
                )
            # Maximum response at time q
            self.P_max.append(self.BestQuery[0])
            self.q += 1

        position = self.generateOutput(self.positions)
        values = self.transform_ymu(self.ymu)
        # print(solution)
        solution = self.ymu_image(self.ymu)

        if self.NextQuery:
            self.NextQuery = np.where(
                self.AcquisitionMap.reshape(len(self.AcquisitionMap))
                == np.max(self.AcquisitionMap.reshape(len(self.AcquisitionMap)))
            )
            print("next querry = " + str(self.NextQuery[0][0]))
            return solution, position, values, str(self.NextQuery[0][0])
        return solution, position, values, "0"

    ####################################################################################################
    #### generate new array in 2 dimentions
    ####################################################################################################
    def generateOutput(self, solution):
        output = []
        for rep in solution:
            tab = []
            for param in rep:
                tab.append(float(param))
            output.append(tab)
        return output

    ####################################################################################################
    #### transform predict heat-map(ymu) form 1D to 2D array
    ####################################################################################################
    def transform_ymu(self, ymu):
        output = []
        for i in range(len(self.positions)):
            output.append([i, ymu[i][0]])
        return output

    def ymu_image(self, ymu):
        """Transform ymu data to base64 image"""

        ymu_r = np.reshape(ymu, (-1, self.dimention))
        print(ymu)
        print(ymu_r)

        plt.clf()
        plt.imshow(ymu_r)
        # plt.imsave(pic_iobytes, ymu_r)
        plt.colorbar()

        # let's add arrows pointing to the lowest values of ymu_r
        # we can use quiver and np.gradient to do this
        # https://matplotlib.org/3.1.1/api/_as_gen/matplotlib.pyplot.quiver.html

        # first we need to get the gradient of ymu_r
        X, Y = np.gradient(ymu_r)
        U = 2*X
        V = -2*Y
        plt.quiver(U, V, color='black', scale=15)

        pic_iobytes = io.BytesIO()
        plt.savefig(pic_iobytes, format="png", transparent=True)
        plt.savefig("ymu.jpg")
        pic_iobytes.seek(0)

        pic_hash = base64.b64encode(pic_iobytes.read())
        return pic_hash.decode("utf-8")

    def sendQueryResult(self):
        pass

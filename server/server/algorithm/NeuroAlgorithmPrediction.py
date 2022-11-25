from .vizualization import generate_heatmap_image
import itertools
import numpy as np
import GPy

class NeuroAlgorithmPrediction:

    def __init__(self) -> None:
        
        # Hyper parameters
        self.mKernel = 5  # Matern kernel order
        self.noise_min = 0.0001
        self.kappa = 5
        self.rho_high = 5
        self.rho_low = 0.02
        self.nrnd = 1  # has to be >= 1
        self.noise_max = 0.05
        np.random.seed(0)

        # Private variables
        self.positions = None
        self.n_chan = 0
        self.next_query = None

    def generate_space(self, dimension, n_param):
        self.dimension = dimension
        self.n_param = n_param
        tab = []
        for i in range(dimension):
            tab.append(i)

        space = []
        for i in range(n_param):
            space.append(tab)

        positions = list(itertools.product(*space))

        self.positions = np.array(positions)
        self.n_chan = len(self.positions)

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
        self.dim_search_space =  self.n_chan
        self.P_test = np.zeros((self.n_chan, 2))    # Storing all queries
        self.q = 0                                  # query number
        self.hyp = [1.0, 1.0, 1.0, 1.0]             # initialize kernel hyperparameters
        
        # random permutation of each entry of the search space
        self.order_this= np.random.permutation(self.dim_search_space) 
        
        self.P_max = []

    def execute_query(self, x_chan, BO_reward):
        if self.q < 100:
            # We will sample the search space randomly for exactly nrnd queries
            if self.q>=self.nrnd:
                # Find next point (max of acquisition function)
                self.acquisition_map = self.ymu \
                    + self.kappa * np.nan_to_num(np.sqrt(self.ys2)) # UCB acquisition function 
                
                # select next query 
                self.next_query = x_chan    
                self.P_test[self.q][0]= self.next_query

            else:
                self.P_test[self.q][0]= int(self.order_this[self.q]) #
                self.query_elec = self.P_test[self.q][0]

            # SEND THIS TO CLINICIAN
            # RECEIVE RESPONSE

            # Noisy response
            self.BO_reward = BO_reward

            # Done reading response
            self.P_test[self.q][1] = self.BO_reward
            
            # The first element of P_test is the selected search space point, the second the 
            # resulting value

            self.x = self.positions[self.P_test[: self.q + 1, 0].astype(int), :]  # Search space position
            self.y = self.P_test[: self.q + 1, 1]  # Test result
            self.y = self.y.reshape((len(self.y), 1))

            # Update the initial value of the parameters
            self.matk.variance = self.hyp[2]
            self.matk.lengthscale[0] = self.hyp[0]
            self.matk.lengthscale[1] = self.hyp[1]

            # Initialization of the model and the constraint of the Gaussian noise
            if self.q == 0:
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

            # We only test for gp predictions at electrodes that we had queried (presumable we only
            # want to return an electrode that we have already queried).
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

        position = self.generate_output(self.positions)
        values = self.transform_ymu(self.ymu)
        heatmap_base64_jpeg_image = generate_heatmap_image(
            self.ymu, [self.dimension] * 2, "parameter #1", "parameter #2"
        )

        if self.next_query:
            self.next_query = np.where(
                self.acquisition_map.reshape(len(self.acquisition_map))
                == np.max(self.acquisition_map.reshape(len(self.acquisition_map)))
            )
            print("Next querry = " + str(self.next_query[0][0]))
            return heatmap_base64_jpeg_image, position, values, str(self.next_query[0][0])
        return heatmap_base64_jpeg_image, position, values, 0

    ################################################################################################
    #### generate new array in 2 dimensions
    ################################################################################################
    def generate_output(self, solution):
        output = []
        for rep in solution:
            tab = []
            for param in rep:
                tab.append(float(param))
            output.append(tab)
        return output

    ################################################################################################
    #### transform predict heat-map(ymu) form 1D to 2D array
    ################################################################################################
    def transform_ymu(self, ymu):
        output = []
        for i in range(len(self.positions)):
            output.append([i, ymu[i][0]])
        return output
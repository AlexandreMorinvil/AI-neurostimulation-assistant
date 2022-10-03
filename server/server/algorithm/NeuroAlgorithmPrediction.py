import itertools
import numpy as np 
import time
from datetime import date
import GPy

class NeuroAlgorithmPrediction:

    positions = None
    n_Chan = 0

    def __init__(self) -> None:
        self.mKernel=5 #Matern kernel order
        self.noise_min=0.0001
        self.kappa=5
        self.rho_high=5 
        self.rho_low=0.02
        self.nrnd=1 #has to be >= 1
        self.noise_max=0.05
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

        positions= list(itertools.product(*space))
        print(positions)
    
        self.positions= np.array(positions)
        self.n_Chan= len(self.positions)

        # Create the kernel
        # Put a  prior on the two lengthscale hyperparameters and the variance
        self.matk = GPy.kern.Matern52(input_dim=2,variance=1.0, lengthscale=[1.0, 1.0], ARD=True, name='Mat52') 
        self.matk.variance.set_prior(GPy.priors.Uniform(0.01**2,100**2), warning=False)
        self.matk.lengthscale.set_prior(GPy.priors.Uniform(self.rho_low, self.rho_high), warning=False)

        # Then run the sequential optimization
        self.DimSearchSpace =  self.n_Chan
        self.MaxQueries = self.DimSearchSpace
        self.P_test =  np.zeros((self.DimSearchSpace, 2)) #storing all queries
        self.q=0 # query number                                
        self.hyp=[1.0, 1.0, 1.0, 1.0]  # initialize kernel hyperparameters               
        self.order_this= np.random.permutation(self.DimSearchSpace) # random permutation of each entry of the search space
        self.P_max=[]
        self.mean_function = GPy.core.Mapping(input_dim=2,output_dim=1)
        self.mean_function.update_gradients = lambda a, b: None 


    def run(self):
        while self.q < self.MaxQueries:
            # We will sample the search space randomly for exactly nrnd queries
            if self.q>=self.nrnd:
                # Find next point (max of acquisition function)
                AcquisitionMap = ymu + self.kappa*np.nan_to_num(np.sqrt(ys2)) # UCB acquisition function
                NextQuery= np.where(AcquisitionMap.reshape(len(AcquisitionMap))==np.max(AcquisitionMap.reshape(len(AcquisitionMap))))

                #print(len(NextQuery))

                # select next query
                if len(NextQuery) > 1:
                    NextQuery = NextQuery[np.random.randint(len(NextQuery))]    
                else:   
                    NextQuery = NextQuery[0]

                #print(NextQuery[0])
                
                self.P_test[self.q][0]= NextQuery[0]
            else:
                self.P_test[self.q][0]= int(self.order_this[self.q]) #
            query_elec = self.P_test[self.q][0]
            
        #SEND THIS TO CLINICIAN
        #RECEIVE RESPONSE

            #noisy response
            BO_reward= np.random.normal(0,0.2)
            # done reading response

            self.P_test[self.q][1]= BO_reward
            # The first element of P_test is the selected search
            # space point, the second the resulting value
                                        
                
            x= self.positions[self.P_test[:self.q+1,0].astype(int),:] # search space position
            y= self.P_test[:self.q+1,1] # test result 
            y= y.reshape((len(y),1))

            
            # Update the initial value of the parameters  
            self.matk.variance= self.hyp[2]
            self.matk.lengthscale[0]= self.hyp[0]
            self.matk.lengthscale[1]= self.hyp[1]
                
            # Initialization of the model and the constraint of the Gaussian noise 
            if self.q==0:
                #m=GPy.models.GPRegression(x,y, kernel= matk, normalizer=None, noise_var=hyp[3])
                m = GPy.models.GPRegression(x,
                                                                y,
                                                                kernel=self.matk,
                                                                normalizer=None,
                                                                noise_var=self.hyp[3])
                m.Gaussian_noise.constrain_bounded(self.noise_min**2,self.noise_max**2, warning=False)
            else:
                m.set_XY(x,y)
                m.Gaussian_noise.variance[0]=self.hyp[3]
            
            # GP-BO optimization
            m.optimize(optimizer='scg', start= None, messages=False, max_iters=10, ipython_notebook=True,
                        clear_after_finish=True)

            X_test= self.positions
            ymu, ys2= m.predict(X_test, full_cov=False, Y_metadata=None, include_likelihood=True)
            
            # We only test for gp predictions at electrodes that
            # we had queried (presumable we only want to return an
            # electrode that we have already queried). 
            Tested= np.unique(self.P_test[:self.q+1,0].astype(int))
            MapPredictionTested=ymu[Tested]
            BestQuery= Tested[(MapPredictionTested==np.max(MapPredictionTested)).reshape(len(MapPredictionTested))]
            
            if len(BestQuery) > 1:
                BestQuery = np.array([BestQuery[np.random.randint(len(BestQuery))]])
            # Maximum response at time q           
            self.P_max.append(BestQuery[0])
            self.q+=1
        
        solution = self.generateOutput(self.P_test)
        print(solution)
        position = self.generateOutput(self.positions)
        print(position)
        return solution, position

    def generateOutput(self, solution):
        output = []
        for rep in solution:
            tab = []
            for param in rep:
                tab.append(float(param))
            output.append(tab)
        return output



        

    def sendQueryResult(self):
        pass
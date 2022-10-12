import itertools
from NeuroAlgorithmPrediction import NeuroAlgorithmPrediction
from itertools import chain, combinations



if __name__ == '__main__':  
    Algo = NeuroAlgorithmPrediction()
    Algo.generate_space(4,2)
    Algo.execute_query(6,2)
    Algo.execute_query(7,2)
    Algo.execute_query(8,2)

    
   
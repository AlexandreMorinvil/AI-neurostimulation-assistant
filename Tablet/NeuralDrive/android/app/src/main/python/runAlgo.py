
from NeuroAlgorithmPrediction import NeuroAlgorithmPrediction




def main():
    print("RUN PYTHON ALGO")
    Algo = NeuroAlgorithmPrediction()
    Algo.generate_space(4,2)
    response = Algo.execute_query(6,2)
    print("response = ")
    print(response[0])



    
   
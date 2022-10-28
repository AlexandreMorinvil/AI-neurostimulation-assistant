class WatchData():
    acc_x = None
    acc_y = None
    acc_z = None
    gir_x = None
    gir_y = None
    gir_z = None

    def __init__(self,  acc_x = None, acc_y = None, acc_z = None, gir_x = None, gir_y = None, gir_z = None) -> None:
        self.acc_x = acc_x
        self.acc_y = acc_y
        self.acc_z = acc_z
        self.gir_x = gir_x
        self.gir_y = gir_y
        self.gir_z = gir_z
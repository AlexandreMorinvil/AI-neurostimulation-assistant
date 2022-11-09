class Session():
    id = None
    algorithm = None
    watch_data = None
    heat_map = None

    def __init__(self, id, algorithm) -> None:
        self.id = id
        self.algorithm = algorithm

    def __init__(self, id, watch_data, heat_map) -> None:
        self.id = id
        self.algorithm = watch_data
        self.heat_map= heat_map
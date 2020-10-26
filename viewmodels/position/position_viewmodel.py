from services import position_services
from viewmodels.shared.viewmodelbase import ViewModelBase


class PositionViewModel(ViewModelBase):
    def __init__(self):
        super().__init__()
        self.my_time = position_services.get_time()
        self.computerTime = ""
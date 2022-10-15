const {
    createStoreService,
    getStoreService,
    getStoreByIdService,
    updateStoreService
} = require("../services/store.service")



exports.createStore = async (req, res) => {
    try {
        const result = await createStoreService(req.body);

        res.status(200).json({
            status: 'Success',
            message: 'Successfully created the Store',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error: 'Couldn\'t create the Store',
            message: error.message
        })
    }
};


exports.getStore = async (req, res) => {
    try {
        const result = await getStoreService();
        res.status(200).json({
            status: 'Success',
            message: 'Successfully found the Store',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error: 'Couldn\'t found the Store',
            message: error.message
        })
    }

}


exports.getStoreById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getStoreByIdService(id, req.body);

        res.status(200).json({
            status: 'Success',
            message: 'Successfully found the Store',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error: 'Couldn\'t found the Store',
            message: error.message
        })
    }
};


  exports.updateStore = async (req, res) => {
    try {
        const {id} = req.params;
    const result = await updateStoreService(id, req.body)

        res.status(200).json({
            status: 'Success',
            message: 'Successfully updated the Store',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error: 'Couldn\'t update the Store',
            message: error.message
        })
    }
  }

const {
    createSupplierService,
    getSupplierService,
    getStupplierByIdService,
    updateSupplierService
} = require("../services/supplier.service")



exports.createSupplier = async (req, res) => {
    try {
        const result = await createSupplierService(req.body);

        res.status(200).json({
            status: 'Success',
            message: 'Successfully created the Store',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error: 'Couldn\'t create the Supplier',
            message: error.message
        })
    }
};


exports.getSupplier = async (req, res) => {
    try {
        const result = await getSupplierService();
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


exports.getSupplierById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getStupplierByIdService(id, req.body);

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


  exports.updateSupplier = async (req, res) => {
    try {
        const {id} = req.params;
    const result = await updateSupplierService(id, req.body)

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
  };

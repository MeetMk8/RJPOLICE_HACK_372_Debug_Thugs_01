import Backendless from "backendless";

export default async function handler(req, res) {
    const data = req.body


    Backendless.initApp("09C25C20-D8C5-B41A-FFDD-8DFBA066F900", "D63055D5-0A8A-4388-971E-DB620CE77F93")
    

    const unitOfWork = new Backendless.UnitOfWork()
    unitOfWork.update("UserData", data)
    unitOfWork.execute().then(function (unitOfWorkResult) {
        res.status(200).json({ result: unitOfWorkResult })
    })
        .catch(function (error) {
            console.log("Server error")
            res.status(500).json({ message: error.message })
        })
}
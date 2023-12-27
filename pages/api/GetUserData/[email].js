import Backendless from "backendless"

export default async function handler(req, res) {
    const email = req.query.email

    Backendless.initApp("09C25C20-D8C5-B41A-FFDD-8DFBA066F900", "D63055D5-0A8A-4388-971E-DB620CE77F93")
    var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause("Email = '" + email + "'")
    const data = await Backendless.Data.of("UserData").find(queryBuilder)

    res.status(200).json({ UserData: data[0] })
}
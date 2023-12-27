export default async function handler(req, res) {

    try {

        var data = req.body
        const { Data, FollowerEmail, FollowerCount, SocialData } = data
        const followerCount = FollowerCount - 1

        const followerData = await getFriendData(FollowerEmail)
        console.log(followerData)

        const newUserData = {
            objectId: Data.objectId,
            Followers: followerCount,
        }

        const updatedUserData = await updateData("UserData", newUserData, res)

        const newFollowerData = {
            objectId: followerData.UserData.UserData.objectId,
            Following: followerData.UserData.UserData.Following - 1
        }


        const updatedFollowerData = await updateData("UserData", newFollowerData, res)

        const newSocialData = {
            objectId: SocialData.response.objectId,
            FollowersList: (SocialData.response.FollowersList).filter((follower) => {
                return follower.Email != FollowerEmail
            })
        }


        const updatedSocialData = await updateData("SocialData", newSocialData, res)

        const newFollowerSocialData = {
            objectId: followerData.SocialData.response.objectId,
            FollowingsList: (followerData.SocialData.response.FollowingsList).filter((following) => {
                return following.Email != Data.Email
            })
        }


        const updatedFollowerSocialData = await updateData("SocialData", newFollowerSocialData, res)

        res.status(200).json({ message: "Follower removed successfully!" })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }

}

async function getFriendData(Email) {
    const response = await fetch(`http://localhost:3000/api/GetUserData/${Email}`)
    const userData = await response.json()
    const response2 = await fetch(`http://localhost:3000/api/GetSocialData/${Email}`)
    const socialData = await response2.json()
    const data = {
        UserData: userData,
        SocialData: socialData
    }
    return data
}

async function updateData(tableName, data, res) {
    Backendless.initApp("09C25C20-D8C5-B41A-FFDD-8DFBA066F900", "D63055D5-0A8A-4388-971E-DB620CE77F93")

    const unitOfWork = new Backendless.UnitOfWork()
    unitOfWork.update(tableName, data)
    const response = await unitOfWork.execute()
    if (response.isSuccess) {
        return response.getResults
    } else {
        res.status(500).json({ message: response.getError })
    }
}
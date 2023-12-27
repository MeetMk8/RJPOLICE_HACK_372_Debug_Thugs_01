export default async function handler(req, res) {
    const data = req.body
    const { Data, FollowingEmail, FollowingCount, SocialData } = data
    const followingCount = FollowingCount - 1

    const followerData = await getFriendData(FollowingEmail)
    console.log(followerData)

    const newUserData = {
        objectId: Data.objectId,
        Following: followingCount,
    }

    const updatedUserData = await updateData("UserData", newUserData, res)

    const newFollowerData = {
        objectId: followerData.UserData.UserData.objectId,
        Followers: followerData.UserData.UserData.Followers - 1
    }


    const updatedFollowerData = await updateData("UserData", newFollowerData, res)

    const newSocialData = {
        objectId: SocialData.response.objectId,
        FollowingsList: (SocialData.response.FollowingsList).filter((following) => {
            return following.Email != FollowingEmail
        })
    }


    const updatedSocialData = await updateData("SocialData", newSocialData, res)

    const newFollowerSocialData = {
        objectId: followerData.SocialData.response.objectId,
        FollowersList: (followerData.SocialData.response.FollowersList).filter((follower) => {
            return follower.Email != Data.Email
        })
    }

    const updatedFollowerSocialData = await updateData("SocialData", newFollowerSocialData, res)

    res.status(200).json({ message: "Unfollowed successfully!" })
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
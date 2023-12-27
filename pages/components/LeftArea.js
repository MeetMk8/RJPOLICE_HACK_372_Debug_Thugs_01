import React, { useEffect, useRef, useState } from 'react'
import styles from "../../styles/LeftArea.module.css"
import Image from 'next/image'
import profilePhoto from "../../public/defaultProfilePicture.png"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Swal from 'sweetalert2'
import Backendless from 'backendless'


function LeftArea({ data }) {

    const slideRightArea = (id) => {
        const rightArea = document.getElementById("rightMain")
        const followersList = document.getElementById("followersList")
        const followingList = document.getElementById("followingList")

        followersList.style.display = "none"
        followingList.style.display = "none"

        if (rightArea.style.display === "") {
            rightArea.style.display = "flex"


            const slideRightKeyframe = [{
                transform: "translateX(100%)"
            },
            {
                transform: "translateX(0%)"
            }
            ]
            rightArea.animate(slideRightKeyframe, {
                duration: 250,
                fill: "forwards"
            })
        }

        if (id == "followers") {
            followersList.style.display = "block"
        } else {
            followingList.style.display = "block"
        }

    }

    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageSRC, setImageSRC] = useState(data.profileUrl)

    useEffect(() => {
        async function checkURL(url) {
            const response = await fetch(url, {
                method: 'HEAD'
            })
            return response.ok
        }
        const checkSRC = `https://finestdirection.backendless.app/api/files/BlogPage/ProfilePictures/${data.objectId}.jpg`
        checkURL(checkSRC).then((result) => {
            if (result) {
                setImageSRC(checkSRC)
            }
            setImageLoaded(true)
        })

    }, [data.objectId])

    const editableDetailesHovered = (e, type) => {
        e.target.style.minWidth = e.target.clientWidth + "px"
        e.target.style.minHeight = e.target.clientHeight + "px"
        e.target.style.pointer = "cursor"
        e.target.style.opacity = "0.6"
        e.target.style.textAlign = "center"
        e.target.style.verticalAlign = "center"
        e.target.innerHTML = "Edit " + type
    }

    const editableDetailesUnhovered = (e, type) => {
        e.target.style.pointer = "cursor"
        e.target.style.opacity = "1"

        if (type == "Bio") {
            e.target.innerHTML = data.Bio
        } else {
            e.target.innerHTML = data.Name
        }
    }


    const changeDetails = (event, type) => {
        const jsonData = {
            objectId: data.objectId,
        }
        Swal.fire({
            title: 'Enter new ' + type.toLowerCase(),
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Change',
            showLoaderOnConfirm: true,
            preConfirm: async (newValue) => {
                if (type == "Name") {
                    jsonData.Name = newValue
                } else if (type == "Bio") {
                    jsonData.Bio = newValue
                }
                const response = await fetch(`http://localhost:3000/api/ChangeDetails`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                })
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                return data
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Name changed successfully!',
                    icon: 'success'
                })
                console.log(result)
                data.Name = result.value.result.results.updateUserData1.result.Name
                data.Bio = result.value.result.results.updateUserData1.result.Bio
                if (type == "Name") {
                    event.target.innerText = data.Name
                } else if (type == "Bio") {
                    event.target.innerText = data.Bio
                }
            }
        })

    }

    const changeProfilePicture = (event) => {
        setImageLoaded(false)
        const jsonData = {
            objectId: data.objectId,
        }
        Swal.fire({
            title: 'Select Image',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your profile picture'
            },
            didClose: () => {
                setImageLoaded(true)
            },
            showLoaderOnConfirm: true
        }).then(async (file) => {
            if (file.value) {
                setImageSRC(profilePhoto)
                Backendless.initApp("09C25C20-D8C5-B41A-FFDD-8DFBA066F900", "D63055D5-0A8A-4388-971E-DB620CE77F93")

                const response = await Backendless.Files.upload(file.value, "BlogPage/ProfilePictures/" + jsonData.objectId + ".jpg", true)



                if (response.fileURL == null || response.fileURL == undefined) {
                    setImageLoaded(true)

                    throw new Error("An error Occurred While Uploading File")
                }

                setImageSRC(`https://finestdirection.backendless.app/api/files/BlogPage/ProfilePictures/${jsonData.objectId}.jpg`)

                setImageLoaded(true)

                Swal.fire({
                    title: 'Profile picture changed successfully!',
                    icon: 'success',

                })
            }
        })
    }


    return (
        <div className={styles.leftLayout}>
            <div className={styles.profileImageDiv} onClick={(e) => changeProfilePicture(e)}>
                {
                    imageLoaded ? <Image src={imageSRC} alt="Profile Picture" className={styles.profileImage} id="ProfileImage" width={100} height={100} unoptimized={true} /> :
                        <Skeleton circle={true} count={1} height={100} width={100} className='h-full w-full' baseColor='	#858585' highlightColor='#dddddd' borderRadius={100} />
                }


            </div>
            <div className={styles.editableDetails}>
                <div
                    className={styles.profileName}
                    onMouseOver={(e) => editableDetailesHovered(e, "Name")}
                    onMouseLeave={(e) => editableDetailesUnhovered(e, "Name")}
                    onClick={(e) => changeDetails(e, "Name")}
                >
                    {data ? data.Name : "--"}
                </div>
                <div
                    className={styles.profileDesc}
                    onMouseOver={(e) => editableDetailesHovered(e, "Bio")}
                    onMouseLeave={(e) => editableDetailesUnhovered(e, "Bio")}
                    onClick={(e) => changeDetails(e, "Bio")}
                >
                    {data ? data.Bio : "--"}
                </div>

            </div>
            <hr
                className="mt-4 w-full h-0.5 bg-black border-none"
            />
            <div className={styles.profileStats}>
                <div className={styles.profileStatsDiv} id='postsDiv'>
                    <div className={styles.statsNum}>{data ? data.Posts : 0}</div>
                    <div className={styles.statsText}>Posts</div>
                </div>
                <hr className="w-full h-0.5 bg-black border-none" />

                <div className={styles.profileStatsDiv} id='followersDiv' onClick={(e) => slideRightArea('followers')}>
                    <div className={styles.statsNum}>{data ? data.Followers : 0}</div>
                    <div className={styles.statsText}>Followers</div>
                </div>
                <hr className="w-full h-0.5 bg-black border-none" />

                <div className={styles.profileStatsDiv} id='followingDiv'
                    onClick={(e) => slideRightArea('following')}>
                    <div className={styles.statsNum}>{data ? data.Following : 0}</div>
                    <div className={styles.statsText}>Following</div>
                </div>
                <hr className="w-full h-0.5 bg-black border-none mb-5" />

            </div>
        </div>
    )
}

export default LeftArea
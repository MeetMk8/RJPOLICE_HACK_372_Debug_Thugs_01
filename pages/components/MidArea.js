import React, { useState } from 'react'
import styles from '../../styles/MidArea.module.css'
import Image from 'next/image'
import insertFilesSVG from '../../public/insert.svg'
import addPostImage from '../../public/addBlog.png'
import DefaultProfilePicture from '../../public/defaultProfilePicture.png'
import Swal from 'sweetalert2'

function MidArea() {
    const [isFloatingIconAnimated, setIsFloatingIconAnimated] = useState(false)

    const [textPart, setTextPart] = useState(null)
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)
    const [isAllImagesSet, setIsAllImagesSet] = useState(false)

    const createPost = (e) => {
        if (!isFloatingIconAnimated) {
            const FloatingBtn = document.getElementById("FloatingIconAddBlog")
            FloatingBtn.animate(
                [
                    { transform: 'rotate(0deg)', right: '20px', bottom: '20px' },
                    { transform: 'rotate(90deg)', right: '-30px', bottom: '80px' }
                ],
                {
                    duration: 500,
                    iterations: 1,
                    fill: 'forwards',
                }
            )
            setIsFloatingIconAnimated(true)


            const createBlogSection =
                document.getElementById("MainBottomSection")
            createBlogSection.animate(
                [
                    { transform: 'translateY(100%)' },
                    { transform: 'translateY(0%)' }
                ],
                {
                    duration: 500,
                    iterations: 1,
                    fill: 'forwards',
                }
            )

        }
    }

    const openFileDialog = async () => {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = 'image/*'
            input.multiple = true,
                input.onchange = () => {
                    const files = Array.from(input.files)

                    resolve(files)
                }
            input.click()
        }).catch((error) => {
            console.log(error)
        })
    }

    const insertImages = async () => {
        const images = await openFileDialog()
        if (images.length > 3) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You can insert upto 3 images only'
            })
            return
        }
        if (images.length == 1) {
            setImage1(URL.createObjectURL(images[0]))
        }
        if (images.length == 2) {
            setImage1(URL.createObjectURL(images[0]))
            setImage2(URL.createObjectURL(images[1]))
        }
        if (images.length == 3) {
            setImage1(URL.createObjectURL(images[0]))
            setImage2(URL.createObjectURL(images[1]))
            setImage3(URL.createObjectURL(images[2]))
        }
    }

    const createBlogStructure = () => {
        if (textPart == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter some text'
            })
            return
        }

        const blogStructure = document.createElement('div')
        blogStructure.className = styles.BlogStructure
        blogStructure.innerHTML = `
            <div class="${styles.BlogText}">
                ${textPart}
            </div>
            <div class="${styles.BlogImages}">
                <div class="${styles.BlogImage1}">
                    <img src="${image1}" alt="Image 1" />
                </div>
                <div class="${styles.BlogImage2}">
                    <img src="${image2}" alt="Image 2" />
                </div>
                <div class="${styles.BlogImage3}">
                    <img src="${image3}" alt="Image 3" />
                </div>
            </div>
        `
        const BlogList = document.getElementsByClassName(styles.BlogList)[0]
        BlogList.appendChild(blogStructure)

    }

    return (
        <div className={styles.MidAreaLayout}>
            <div className={styles.BlogList}>

            </div>
            <div id='MainBottomSection' className={styles.MainBottomSection}>
                <div id='CreateBlogSection' className={styles.CreateBlogSection}>
                    <span className='font-bold text-2xl underline underline-offset-[3px]'>Share your Ideas</span>

                    <div className={styles.CreateBlogSectionInput}>
                        <div class="flex justify-between items-center">
                            <label for="hs-autoheight-textarea" class="block text-sm font-medium mb-2 dark:text-white">Share Your Thoughts</label>
                        </div>
                        <textarea id="hs-autoheight-textarea" class="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-40 border-2 border-black outline-none resize-none h-[80%]" rows="3" onChange={(e) => setTextPart(e.target.value)} placeholder="Hello everyone ..."></textarea>
                    </div>
                    <div className={styles.BottomPartCreateBlog}>
                        <div className={styles.ShowImages}>
                            {
                                image1 != null ?
                                    <div className={styles.Image1}>
                                        <Image width={80} height={80} src={image1} alt='Image 1' />
                                    </div> : ''
                            }
                            {
                                image2 != null ?
                                    <div className={styles.Image2}>
                                        <Image width={80} height={80} src={image2} alt='Image 2' />
                                    </div> : ''
                            }
                            {
                                image3 != null ?
                                    <div className={styles.Image3}>
                                        <Image width={80} height={80} src={image3} alt='Image 3' />
                                    </div> : ''
                            }
                        </div>
                        <div className={styles.ActionButtons}>
                            <div className={styles.SelectImages} onClick={insertImages}>
                                <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                    Insert Images
                                    <Image className='mt-[3px]' src={insertFilesSVG} alt='Insert Images' />

                                </button>
                            </div>
                            <div className={styles.PostBlog}>
                                <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                    Post Blog
                                </button>
                            </div>
                            <div className={styles.ShowBlog} onClick={() => createBlogStructure()}>
                                <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-600 text-white hover:bg-yellow-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                    Show Blog
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='ShowBlogSection' className={styles.ShowBlogSection}>
                    <div className={styles.BlogStructure}>
                        <div className={styles.ProfileBar}>
                            <div className={styles.ProfileImage}>
                                <Image width={50} height={50} src={DefaultProfilePicture} alt='Profile Image' />
                            </div>
                            <div className={styles.ProfileDetails}>
                                <div className={styles.ProfileName}>
                                    <span className='font-bold text-xl'>Tirth Desai</span>
                                </div>
                                <div className={styles.ProfileDate}>
                                    <span className='text-sm'>21-07-2021</span>
                                </div>
                            </div>

                        </div>
                        <div className={styles.BlogText}>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisi
                                cing elit. Voluptatibus, quos. Quisquam, quas
                                itaque. Quisquam, quas itaque.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <div className={styles.FloatingIconAddBlog} id='FloatingIconAddBlog' onClick={(e) => createPost(e)}>
                <Image alt='Add Post' src={addPostImage} />
                <span>Create Blog</span>
            </div>
        </div>
    )
}

export default MidArea
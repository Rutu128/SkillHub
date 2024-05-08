import axios from "axios";
import React, { useState } from "react";


const UploadCertificate = () => {
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formdata = new FormData();
        formdata.append("file", image);
        formdata.append("upload_preset", "s3zv7zdt");
        let imgurl = "";
        await axios.post("https://api.cloudinary.com/v1_1/dgz8lnzir/image/upload", formdata)
            .then((res) => {
                if (res.status === 200) {
                    imgurl = res.data.secure_url
                    // console.log(res.data.secure_url);
                    setTimeout(() => {
                        setIsLoading(false);
                        alert("Certificate uploaded successfully!");
                    }, 2000);
                }
            })
            .catch((error) => {
                console.error("Error uploading image: ", error);
            });
        let data = {
            title,
            description,
            imgurl
        }
        console.log(data)
    };
    return (
        <section className="flex justify-center items-center">
            <div className="container">
                <div className="card bg-white shadow-lg rounded-lg p-5">
                    <form className="space-y-4" onSubmit={handleUpload}>
                        <div className="mt-4">
                            <label className="text-sm font-medium text-gray-700 block">
                                Title:
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                style={{ borderRadius: '0', padding: '7px', marginTop: '5px', marginLeft: '8px', width: '250px' }
                                } required
                            />
                        </div>


                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Description:
                            </label>
                            <div className="mt-1">
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md shadow-sm text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    style={{ borderRadius: '0', padding: '10px', width: '400px', height: '120px' }} required
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Certificate:
                            </label>
                            <div className="mt-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleImageChange}
                                    className="block w-full border border-gray-300 rounded-md shadow-sm text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    style={{ borderRadius: '0', padding: '10px' }} required
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            {isLoading ? (
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                    style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}
                                >
                                    Uploading...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                    style={{ backgroundColor: 'var(--primary)', fontWeight: 'bold' }}
                                >
                                    Upload Certificate
                                </button>
                            )}
                        </div>


                    </form>
                    <div className="mt-4">
                        {imagePreview && (
                            <img src={imagePreview} alt="Certificate Preview" className="rounded w-24 h-24 object-cover" />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UploadCertificate;
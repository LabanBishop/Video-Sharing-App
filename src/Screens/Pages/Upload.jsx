import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Upload.css";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Function to fetch categories from a text file
        const fetchCategories = async () => {
            try {
                const response = await fetch("/categories.txt"); // Adjust the path as needed
                const data = await response.text();
                const categoriesArray = data.split("\n").filter(category => category.trim() !== "");
                setCategories(categoriesArray);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const upload = () => {
        if (!file) {
            setErrorMessage("Please select a file to upload");
            return;
        }
    
        if (!file.name.endsWith('.mp4')) {
            setErrorMessage("Please upload only .mp4 files");
            return;
        }
    
        if (!title) {
            setErrorMessage("Please enter a title");
            return;
        }
    
        if (!selectedCategory) {
            setErrorMessage("Please select a category");
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file, file.name); // Use the original file name
        formData.append('title', title);
        formData.append('categories', selectedCategory);
    
        const fileInfo = `Title: ${title}\nCategory: ${selectedCategory}\nView Count: 0\nFile Name: ${file.name}\nFile Size: ${file.size} bytes\nFile Type: ${file.type}`;
        const fileBlob = new Blob([fileInfo], { type: 'text/plain' });
        formData.append('infoFile', fileBlob, `${file.name.split('.')[0]}_info.txt`); // Use the original file name for the info file
    
        axios.post('http://localhost:3001/upload', formData)
            .then(res => {
                console.log(res.data);
                setErrorMessage("");
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.data) {
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage("An error occurred while uploading the file");
                }
            });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setErrorMessage("");
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setErrorMessage("");
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setErrorMessage("");
    };

    return (
        <div className="upload-container">
            <div className="upload-form">
                <input type="file" onChange={handleFileChange} accept=".mp4"/>
                <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter title"/>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <button type="button" onClick={upload}>Upload</button>
                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            </div>
        </div>
    );
};

export default Upload;
import React, { useState } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import BookDataService from '../services/book.services';
import { useEffect } from 'react';

const AddBook = ({ baseChangeChecker, setBaseChangeChecker, currentBookId, setCurrentBookId }) => {
    const intitalInputState = {
        title: "",
        author: "",
        status: true,
    };
    const [bookDetails, setBookDetails] = useState(intitalInputState);
    const [message, setMessage] = useState({ error: false, msg: "" });

    function resetInputs() {
        setBookDetails(intitalInputState);
    }
    function emptyMessage() {
        setTimeout(() => {
            setMessage({ error: false, msg: "" });
        }, 5000);
    }

    function performValidation() {
        if (bookDetails.title === "" || bookDetails.author === "") {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            emptyMessage();
            return false;
        }
        return true;
    }

    function handleChange(e) {
        let name = e.target.dataset?.inputName ? e.target.dataset?.inputName : e.target.name;
        let value = e.target.dataset?.inputValue
            ?
            (
                e.target.dataset?.inputValue === 'true'
            )
            :
            e.target.value;
        if (name === 'available') {
            setBookDetails(prev => {
                return {
                    ...prev,
                    status: Boolean(value),
                }
            })
        } else {
            setBookDetails(prev => {
                return {
                    ...prev,
                    [name]: value,
                }
            })
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!performValidation()) {
            return;
        }
        const newBook = {
            ...bookDetails,
            status: bookDetails.status ? 'Available' : 'Not Available',
        }
        try {
            if (currentBookId) {
                await BookDataService.updateBook(currentBookId, newBook);
                setMessage({
                    error: false,
                    msg: "Books Details Updated Successfully!",
                });
            } else {
                await BookDataService.addBook(newBook);
                setMessage({
                    error: false,
                    msg: "Book Added Successfully!",
                });
            }
            setBaseChangeChecker(!baseChangeChecker);
            setCurrentBookId('');
            emptyMessage();
            resetInputs();
        } catch (error) {
            console.log(error);
            setMessage({
                error: true,
                msg: "An unexpected error occured while updating database!",
            });
        }
    }

    const fetchAndFillInputs = async () => {
        const data = await BookDataService.getBook(currentBookId);
        const res = data.data();
        setBookDetails({
            ...res,
            status: res.status === 'Available' ? true : false,
        });
    }

    useEffect(() => {
        if (currentBookId) {
            fetchAndFillInputs();
        }
    }, [currentBookId]);

    return (
        <div className="flex justify-center">
            <div className=' flex flex-col justify-center'>
                <form onSubmit={handleSubmit}>
                    <Stack className='p-5' direction="column" spacing={2}>
                        <Typography
                            className='text-center'
                            variant='h6' >
                            Enter the book details below
                        </Typography>
                        <TextField
                            size='small'
                            label="Title"
                            name='title'
                            variant="outlined"
                            // required
                            value={bookDetails.title}
                            onChange={handleChange}
                        />
                        <TextField
                            size='small'
                            label="Author"
                            name='author'
                            variant="outlined"
                            // required
                            value={bookDetails.author}
                            onChange={handleChange}
                        />
                        <div className="flex flex-row text-white justify-center">
                            <div
                                className={`
                                ${bookDetails.status ? 'bg-emerald-700' : 'bg-green-300'}
                                py-2 cursor-pointer px-3 rounded-tl-md rounded-bl-md text-sm`}
                                data-input-name='available'
                                data-input-value={true}
                                value={true}
                                onClick={handleChange}
                            >
                                Available
                            </div>
                            <div
                                className={`
                                ${bookDetails.status ? 'bg-red-300' : 'bg-red-700'} 
                                py-2 cursor-pointer px-3 rounded-tr-md rounded-br-md text-sm`}
                                data-input-name='available'
                                data-input-value={false}
                                onClick={handleChange}
                            >
                                Not Available
                            </div>
                        </div>
                        <Button type='submit' variant='contained'>ADD / UPDATE</Button>
                    </Stack>
                </form>
                {
                    message?.msg && (
                        <div className="text-center">

                            <Typography color={
                                message?.error ?
                                    'error' : 'success'
                            }>
                                {message.msg}
                            </Typography>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AddBook
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack, styled } from '@mui/material';
import { useEffect } from 'react';
import BookDataService from '../services/book.services';
import { useState } from 'react';


const StyledTableHeaderCell = styled(TableCell)({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'black',
        color: 'white',
    },
    // [`&.${tableCellClasses.body}`]: {
    //     fontSize: 14,
    // },
});

export default function DisplayBooks({ baseChangeChecker, setCurrentBookId }) {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        getBooks();
    }, [baseChangeChecker]);

    const getBooks = async () => {
        const data = await BookDataService.getAllBooks();
        const actualDataToSet = data.docs.map(doc => {
            return {
                ...doc.data(),
                id: doc.id,
            }
        });
        setBooks(actualDataToSet);
    }

    const deleteSpecificBook = async (id) => {
        await BookDataService.deleteBook(id);
        getBooks();
    }

    return (
        <div className="flex justify-center mt-4">
            <div className=' flex flex-col justify-center p-3 '>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bg-black text-white'>
                                <StyledTableHeaderCell>#</StyledTableHeaderCell>
                                <StyledTableHeaderCell>Book Title</StyledTableHeaderCell>
                                <StyledTableHeaderCell align="right">Book Author</StyledTableHeaderCell>
                                <StyledTableHeaderCell align="right">Status</StyledTableHeaderCell>
                                <StyledTableHeaderCell align="right">Action</StyledTableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                books.length === 0 && (
                                    <TableRow>
                                        <TableCell align='center' colSpan={5}>
                                            No Rows to display
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            {books.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="right">{row.author}</TableCell>
                                    <TableCell align="right">
                                        {
                                            row.status
                                        }
                                    </TableCell>
                                    <TableCell align="right">
                                        <Stack direction='row' gap={3} className='justify-end'>
                                            <Button
                                                variant='contained'
                                                // onClick={(e) => fillDetailsOfSpecificBook(row.id)}
                                                onClick={(e) => setCurrentBookId(row.id)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant='contained' color='error'
                                                onClick={(e) => deleteSpecificBook(row.id)}>
                                                Delete
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
}

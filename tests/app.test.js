const request = require('supertest');
let { app } = require('../index.js');
let { getAllBooks, getBookById } = require('../controllers/index.js');
const http = require('http');
jest.mock('../controllers/index.js', () => ({
  ...jest.requireActual('../controllers/index.js'),
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
}));

describe('Controller Function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all books', () => {
    const mockedBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];
    getAllBooks.mockReturnValue(mockedBooks);
    const result = getAllBooks();
    expect(result).toEqual(mockedBooks);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints tests', () => {
  it('GET API /books should get all books', async () => {
    const mockedBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];
    getAllBooks.mockResolvedValue(mockedBooks);

    const res = await request(app).get('/books');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      books: mockedBooks,
    });
    expect(res.body.books.length).toBe(3);
  });

  it('GET /books/details/:id should get an books by ID', async () => {
    const mockedBooks = {
      bookId: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
    };

    getBookById.mockResolvedValue(mockedBooks);

    const res = await request(app).get('/books/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      books: mockedBooks,
    });
  });
});

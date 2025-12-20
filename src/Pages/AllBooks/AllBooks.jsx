import BookCard from "../../components/BookCard/BookCard";

const AllBooks = () => {
  // ⚡ Fake books data
  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      price: 500,
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 350,
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      title: "Deep Work",
      author: "Cal Newport",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: 400,
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      title: "The 7 Habits",
      author: "Stephen Covey",
      price: 550,
      image:
        "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      price: 600,
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">All Books</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Fetch single book
  const { data: book, isLoading } = useQuery({
    queryKey: ["books", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      price: "",
      description: "",
      image: "",
      status: "",
    },
  });

  React.useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        price: book.price,
        description: book.description,
        image: book.image,
        status: book.status,
      });
    }
  }, [book, reset]);

  const updateBookMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/books/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["books", id]);
      navigate("/dashboard/my-books");
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to update book ❌");
    },
  });

  const onSubmit = (data) => {
    updateBookMutation.mutate(data);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="label">
            <span className="label-text">Book Title</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-error mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="label">
            <span className="label-text">Author</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("author", { required: "Author is required" })}
          />
          {errors.author && (
            <p className="text-error mt-1">{errors.author.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && (
            <p className="text-error mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("image", { required: "Image URL is required" })}
          />
          {errors.image && (
            <p className="text-error mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register("status", { required: "Status is required" })}
          >
            <option value="">Select status</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
          {errors.status && (
            <p className="text-error mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={5}
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-error mt-1">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={updateBookMutation.isLoading}
        >
          {updateBookMutation.isLoading ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;

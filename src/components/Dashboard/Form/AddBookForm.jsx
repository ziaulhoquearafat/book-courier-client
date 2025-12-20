import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaAlignLeft, FaBook, FaDollarSign, FaUser } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { imageUploadCloudinary } from "../../../utils";

const AddBookForm = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/books`,
        payload
      );
      return res.data;
    },

    onSuccess: () => {
      toast.success("Book Added Successfully ✅");

      // 🔥 AllBooks query refresh করবে
      queryClient.invalidateQueries(["books"]);

      // 🔄 form clear
      reset();
    },

    onError: (error) => {
      console.error(error);
      toast.error("Failed to add book ❌");
    },
  });

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const imageUrl = await imageUploadCloudinary(imageFile);

      const bookData = {
        title: data.title,
        author: data.author,
        description: data.description,
        price: Number(data.price),
        status: data.status,
        image: imageUrl,
        seller: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      await mutateAsync(bookData);
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed ❌");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-base-100 rounded-xl shadow-lg border border-base-200">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-primary">Add New Book</h2>
        <p className="text-base-content/70 mt-2">
          Enter the details to add a new book
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Book Name & Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">Book Name</label>
            <div className="relative">
              <input
                className="input input-bordered pl-10"
                {...register("title", { required: "Book name is required" })}
              />
              <FaBook className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {errors.title && (
              <p className="text-error text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">Author Name</label>
            <div className="relative">
              <input
                className="input input-bordered pl-10"
                {...register("author", { required: "Author is required" })}
              />
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {errors.author && (
              <p className="text-error text-sm">{errors.author.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">Description</label>
          <div className="relative">
            <textarea
              className="textarea textarea-bordered pl-10"
              rows="4"
              {...register("description", {
                required: "Description is required",
              })}
            />
            <FaAlignLeft className="absolute left-3 top-4" />
          </div>
        </div>

        {/* Price & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">Price</label>
            <div className="relative">
              <input
                type="number"
                className="input input-bordered pl-10"
                {...register("price", { required: "Price is required" })}
              />
              <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="form-control">
            <label className="label">Status</label>
            <select
              className="select select-bordered"
              defaultValue="published"
              {...register("status")}
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>
        </div>

        {/* Image */}
        <div className="form-control">
          <label className="label">Book Image</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("image", { required: true })}
          />
        </div>

        {/* Submit */}
        <button disabled={isPending} className="btn btn-primary w-full">
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Add Book"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;

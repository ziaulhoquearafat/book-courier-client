import axios from "axios";
import { useForm } from "react-hook-form";
import {
  FaAlignLeft,
  FaBook,
  FaCloudUploadAlt,
  FaDollarSign,
  FaUser,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { imageUploadCloudinary } from "../../../utils";

const AddBookForm = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const imageUrl = await imageUploadCloudinary(imageFile);

      const bookData = {
        title: data.title,
        author: data.author,
        description: data.description,
        price: Number(data.price),
        status: data.status, // published / unpublished
        image: imageUrl,
        seller: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/books`,
        bookData
      );

      console.log("Book added:", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-base-100 rounded-xl shadow-lg border border-base-200">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-primary space-grotesk">
          Add New Book
        </h2>
        <p className="text-base-content/70 mt-2 inter">
          Enter the details to add a new book to the inventory
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 inter">
        {/* Book Name & Author - 2 Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Book Name</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter book name"
                className={`input input-bordered w-full pl-10 ${
                  errors.title ? "input-error" : ""
                }`}
                {...register("title", { required: "Book name is required" })}
              />
              <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {errors.title && (
              <span className="text-error text-sm mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Author Name</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter author name"
                className={`input input-bordered w-full pl-10 ${
                  errors.author ? "input-error" : ""
                }`}
                {...register("author", { required: "Author name is required" })}
              />
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {errors.author && (
              <span className="text-error text-sm mt-1">
                {errors.author.message}
              </span>
            )}
          </div>
        </div>

        {/* ----- */}

        {/* Description - Full Width */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Description</span>
          </label>
          <div className="relative">
            <textarea
              placeholder="Enter book description"
              rows="4"
              className={`textarea textarea-bordered w-full pl-10 pt-3 ${
                errors.description ? "textarea-error" : ""
              }`}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
            />
            <FaAlignLeft className="absolute left-3 top-4 text-gray-400" />
          </div>
          {errors.description && (
            <span className="text-error text-sm mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* ----- */}

        {/* Price & Status - 2 Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Price</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                className={`input input-bordered w-full pl-10 ${
                  errors.price ? "input-error" : ""
                }`}
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
              />
              <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {errors.price && (
              <span className="text-error text-sm mt-1">
                {errors.price.message}
              </span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Status</span>
            </label>
            <select
              className="select select-bordered w-full"
              defaultValue="published"
              {...register("status")}
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>
        </div>

        {/* Image Upload - Full Width */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Book Cover Image</span>
          </label>
          <div className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center hover:bg-base-50 transition-colors relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              {...register("image", { required: "Book image is required" })}
            />
            <div className="flex flex-col items-center justify-center pointer-events-none">
              <FaCloudUploadAlt className="text-4xl text-primary mb-2" />
              <p className="font-semibold text-lg">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-base-content/60">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
          </div>
          {errors.image && (
            <span className="text-error text-sm mt-1 text-center block">
              {errors.image.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full text-lg font-medium text-white transition-all hover:scale-[1.01] active:scale-[0.98]"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;

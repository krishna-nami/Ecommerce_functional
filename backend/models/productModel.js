import mongoose from 'mongoose';
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Pleasae Enter PRoduct NAme'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Pleasae Enter PRoduct Description'],
    },
    price: {
      type: Number,
      required: [true, 'Pleasae Enter PRoduct Price'],
      maxLength: [8, 'Price cannot exceed 8 charactor'],
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Please Enter PRoduct Category'],
    },
    Stock: {
      type: Number,
      required: [true, 'Please Enter Stock numbner'],
      maxLength: [4, 'Stock cannot exceet 4 characters'],
      default: 1,
    },
    numofReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model('Product', productSchema);

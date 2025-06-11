import mongoose from 'mongoose';

const SchoolSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  address: String,
  arr: String,
  coordinates: {
    type: { type: String },
    coordinates: [Number],
  },
});

SchoolSchema.index({ coordinates: '2dsphere' });

export default mongoose.model('School', SchoolSchema);

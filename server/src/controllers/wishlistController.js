import Wishlist from "../models/WishlistModel.js";
import Property from "../models/PropertyModel.js";

const addToWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user._id;

    // 1. Check property exists
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // 2. Check property is available
    if (!property.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Property is not available",
      });
    }

    // 3. Check already wishlisted
    const existingWishlist = await Wishlist.findOne({
      user: userId,
      property: propertyId,
    });

    if (existingWishlist) {
      return res.status(409).json({
        success: false,
        message: "Property already in wishlist",
      });
    }

    // 4. Create wishlist
    const wishlist = await Wishlist.create({
      user: userId,
      property: propertyId,
    });

    return res.status(201).json({
      success: true,
      message: "Property added to wishlist",
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add property to wishlist",
      error: error.message,
    });
  }
};


const getMyWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await Wishlist.find({
      user: userId,
    })
      .populate({
        path: "property",
        populate: {
          path: "owner",
          select: "name email phone",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      count: wishlist.length,
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
      error: error.message,
    });
  }
};

export { addToWishlist, getMyWishlist };
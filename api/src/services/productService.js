const { Product, Product_Imgs, Category } = require('../db/models/index.js');
const { v4 } = require('uuid');
const { ResponseError } = require('../error/response-error.js');
const { clearImage } = require('../utils/fileUpload.js');

const create = async (req) => {
  const { categoryId, name, price, images, size, description } = req;

  let product;

  await Product.build({
    id: v4(),
    name,
    price,
    categoryId,
    size,
    status: true,
    description,
  })
    .save()
    .then((res) => (product = res))
    .catch((err) => console.log(err));

  // looping product imgs
  for (const image of images) {
    await Product_Imgs.build({
      id: v4(),
      img_url: image.path,
      productId: product.id,
    })
      .save()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return {
    id: product.id,
    message: 'Product create successfully!',
  };
};

const updateProduct = async (req) => {
  const {
    id,
    categoryId,
    name,
    price,
    images,
    size,
    description,
    deletedImg,
    status,
  } = req;

  const productId = JSON.parse(id);
  const deletedImages = JSON.parse(deletedImg);

  const product = await Product.findByPk(productId);
  if (!product) throw new ResponseError(404, 'product not found!');

  if (product.name != name) {
    product.name = name;
  }
  if (product.categoryId != categoryId) {
    product.categoryId = categoryId;
  }
  if (product.price != price) {
    product.price = price;
  }
  if (product.size != size) {
    product.size = size;
  }
  if (product.description != description) {
    product.description = description;
  }
  if (product.status != status) {
    product.status = status;
  }

  await product.save();

  // looping product imgs
  if (images.length > 0) {
    for (const image of images) {
      await Product_Imgs.build({
        id: v4(),
        img_url: image.path,
        productId: product.id,
      })
        .save()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }

  if (deletedImages.length > 0) {
    for (const img of deletedImages) {
      const imgProduct = await Product_Imgs.findByPk(img.id);
      const img_url = imgProduct.img_url.split('\\');
      clearImage(imgProduct.img_url);
      await imgProduct.destroy();
    }
  }

  return {
    message: 'Product Edited successfully!',
  };
};

const remove = async (id) => {
  const product = await Product.findByPk(id);

  if (!product) throw new ResponseError(404, 'Product not found!');

  const product_imgs = await Product_Imgs.findAll({
    where: {
      productId: id,
    },
  });

  for (const images of product_imgs) {
    const imageUrl = images.img_url.split('\\');
    clearImage(images.img_url);
  }
  await product.destroy();

  return { message: 'Delete Product Successfully!' };
};

const getAll = async () => {
  const products = await Product.findAll({
    include: ['product_imgs', 'categories'],
  });
  return products;
};

const getAllClient = async () => {
  const products = await Product.findAll({
    where: {
      status: true,
    },
    include: ['product_imgs', 'categories'],
  });
  return products;
};

const getTheLatest = async () => {
  const products = await Product.findAll({
    where: {
      status: true,
    },
    limit: 5,
    include: ['product_imgs', 'categories'],
  });
  return products;
};

const getById = async (id) => {
  const product = await Product.findOne({
    where: {
      id,
    },
    include: ['product_imgs', 'categories'],
  });
  return product;
};

const getByIdForOrder = async (id) => {
  const product = await Product.findOne({
    where: {
      id,
    },
    include: ['product_imgs', 'categories'],
  });
  return product;
};

const getByCategory = async (name) => {
  const products = await Category.findAll({
    where: {
      name,
    },
    include: 'products',
  });

  return products;
};

const getAllByCategory = async (categoryId) => {
  const products = await Product.findAll({
    where: { categoryId, status: true },
    include: 'product_imgs',
  });

  return products;
};

const updateProductStatus = async (id, status) => {
  const product = await Product.findByPk(id);

  if (!product) throw new ResponseError(404, 'product not found!');

  product.status = status;

  await product.save();
};

module.exports = {
  create,
  getAll,
  getAllClient,
  remove,
  getById,
  getTheLatest,
  getByCategory,
  getAllByCategory,
  updateProductStatus,
  getByIdForOrder,
  updateProduct,
};

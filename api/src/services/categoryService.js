const { v4 } = require('uuid');

const { Admin, Category } = require('../db/models/index.js');
const { ResponseError } = require('../error/response-error.js');

const create = async (body, headers) => {
  const { name, adminId } = body;

  await Category.build({
    id: v4(),
    name: name.toLowerCase(),
    adminId,
  }).save();

  return {
    message: 'success create new category!',
  };
};

const remove = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) throw new ResponseError(404, 'category not found!');

  await category.destroy();

  return { message: 'Delete category successfully!' };
};

const edit = async (req) => {
  const { name, id } = req;

  const category = await Category.findByPk(id);

  if (!category) throw new ResponseError(404, 'category not found!');

  if (name) {
    category.name = name;
  }

  await category.save();

  return { message: 'Update category successfully!' };
};

const getAll = async () => {
  const categories = await Category.findAll({
    attributes: ['id', 'name'],
  });

  return categories;
};

const getByName = async (name) => {
  const category = await Category.findOne({
    where: {
      name,
    },
    attributes: {
      exclude: ['adminId'],
    },
  });
  return category;
};

module.exports = { create, getAll, remove, edit, getByName };

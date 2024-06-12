const { Banner, Admin } = require('../db/models/index.js');
const { v4 } = require('uuid');
const { ResponseError } = require('../error/response-error.js');
const { clearImage } = require('../utils/fileUpload.js');

const create = async (body) => {
  const { title, adminId, img_url, isActive } = body;
  let banner;

  // need img url
  await Banner.build({
    id: v4(),
    title,
    adminId,
    img_url,
    isActive,
  })
    .save()
    .then((res) => {
      banner = res;
    })
    .catch((err) => console.log(err));

  return {
    id: banner.id,
    message: 'Banner create successfully!',
  };
};

const getAll = async () => {
  const banners = await Banner.findAll({
    attributes: ['id', 'title', 'img_url', 'isActive'],
  });
  return banners;
};

const remove = async (id) => {
  const banner = await Banner.findByPk(id);
  if (!banner) throw new ResponseError(404, 'banner not found!');

  // const img_url = banner.img_url.split('\\');
  clearImage(banner.img_url);
  await banner.destroy();

  return { message: 'Delete banner successfully!' };
};

const editStatus = async (body) => {
  const { id, isActive } = body;
  const banner = await Banner.findByPk(id);
  if (!banner) throw new ResponseError(404, 'banner not found!');

  banner.isActive = isActive;

  await banner.save();

  return { message: 'Edit Status Successfully!' };
};

const getActiveBanner = async () => {
  const banners = await Banner.findAll({
    attributes: ['id', 'title', 'img_url'],
    where: {
      isActive: true,
    },
  });

  return banners;
};

module.exports = { create, getAll, remove, editStatus, getActiveBanner };

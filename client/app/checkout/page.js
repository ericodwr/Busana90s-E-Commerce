'use client';

import { Field, Label, Select } from '@headlessui/react';
import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../utils/api';
import { useCartContext } from '../context/CartProvider';
import useSnap from '../hooks/useSnap';

const initialState = {
  name: '',
  email: '',
  phone: '',
  province: '',
  city: '',
  address: '',
  courier: '',
  services: '',
  shippingCost: null,
  cartItems: [],
  total: 0,
};

let cityId;

const CheckoutPage = () => {
  // state
  const [formData, setFormData] = useState(initialState);
  const [provinces, setProvinces] = useState([]);
  const [city, setCity] = useState([]);
  const [courierServices, setCourierServices] = useState([]);
  const [isValid, setIsValid] = useState(false);

  // context
  const { cartItems, handleCheckout, snapShow, changeSnapShow } =
    useCartContext();

  // hooks
  const { snapEmbed } = useSnap();

  // router
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get('/province');
      setProvinces(data.data.rajaongkir.results);
      return data;
    };
    fetchData();

    setFormData((state) => {
      return { ...state, cartItems };
    });
  }, []);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const {
      name,
      address,
      city,
      courier,
      email,
      phone,
      province,
      services,
      shippingCost,
      cartItems,
      total,
    } = formData;

    if (
      name &&
      address &&
      city &&
      courier &&
      email &&
      phone &&
      province &&
      services &&
      shippingCost &&
      cartItems &&
      total
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const onChange = (e) => {
    if (e.target.name == 'phone') {
      const re = /^[0-9\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
        setFormData((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      }
    } else if (e.target.name == 'province') {
      const [id, name] = e.target.value.split('-');
      const data = api
        .get(`/city/?province=${id}`)
        .then((res) => {
          setCity(res.data.rajaongkir.results);
          setFormData((prev) => {
            return { ...prev, [e.target.name]: name };
          });
        })
        .catch((err) => console.log(err));
    } else if (e.target.name == 'city') {
      const [id, name] = e.target.value.split('-');
      cityId = id;
      setFormData((prev) => {
        return { ...prev, [e.target.name]: name };
      });
    } else if (e.target.name == 'courier') {
      api
        .get(
          `/cost?destination=${cityId}&weight=1000&courier=${e.target.value}`,
        )
        .then((res) => {
          setCourierServices(res.data.rajaongkir.results[0].costs);
          setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          });
        })
        .catch((err) => console.log(err));
    } else if (e.target.name == 'services') {
      const [services, cost] = e.target.value.split('-');
      let total = cartItems.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
      );

      setFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: services,
          shippingCost: cost,
          total: total + Number(cost),
        };
      });
    } else {
      setFormData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = await api.post('/api/order', formData);
    if (data.status == 201) {
      changeSnapShow(true);
      snapEmbed(data.data.snap_token, 'snap-container', {
        onSuccess: function (result) {
          console.log(result);
          changeSnapShow(false);
          handleCheckout();
          router.push('/');
        },
        onPending: function (result) {
          console.log(result);
          changeSnapShow(false);
        },
        onClose: function () {
          changeSnapShow(false);
        },
      });
    }
  };

  return (
    <section className="container">
      {!snapShow && (
        <>
          <h2 className="my-6 font-bold text-2xl text-center">Checkout</h2>
          <form className="grid grid-cols-2 gap-12" onSubmit={onSubmit}>
            <div>
              <h2 className="font-bold text-xl mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 gap-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="leading-6">
                    Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={onChange}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="leading-6">
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={onChange}
                      autoComplete="given-email"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="leading-6">
                    Phone
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      maxLength={'13'}
                      value={formData.phone}
                      onChange={onChange}
                      autoComplete="given-email"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* Province and City */}
                <div className="grid grid-cols-2 gap-x-8">
                  {/* Province */}
                  <div>
                    <label htmlFor="province" className="leading-6">
                      Province
                    </label>
                    <div className="mt-2.5">
                      <Select
                        name="province"
                        as={Fragment}
                        className="cursor-pointer"
                      >
                        {({ focus, hover }) => (
                          <select
                            onChange={onChange}
                            className={`border w-full px-3.5 py-2 rounded-md border-gray-300 
                      ${focus && ' bg-blue-100'}
                        ${hover && 'shadow'}`}
                            aria-label="Project status"
                          >
                            {provinces.map((province) => (
                              <option
                                value={`${province.province_id}-${province.province}`}
                                key={province.province_id}
                              >
                                {province.province}
                              </option>
                            ))}
                          </select>
                        )}
                      </Select>
                    </div>
                  </div>
                  {/* City */}
                  <div>
                    <label htmlFor="city" className="leading-6">
                      City
                    </label>
                    <div className="mt-2.5">
                      <Select
                        name="city"
                        as={Fragment}
                        disabled={!city.length}
                        className="disabled:bg-gray-200 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {({ focus, hover }) => (
                          <select
                            onChange={onChange}
                            className={`border w-full px-3.5 py-2 rounded-md border-gray-300 
                      ${focus && ' bg-blue-100'}
                        ${hover && 'shadow'}`}
                            aria-label="Project status"
                          >
                            <option value="">Select One</option>
                            {city.map((data) => (
                              <option
                                value={`${data.city_id}-${data.city_name}`}
                                key={data.city_id}
                              >
                                {data.city_name}
                              </option>
                            ))}
                          </select>
                        )}
                      </Select>
                    </div>
                  </div>
                </div>
                {/* Address */}
                <div>
                  <label htmlFor="address" className="leading-6">
                    Address
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      onChange={onChange}
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="given-email"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-xl mb-4">Shipment</h2>
              <div className="grid grid-cols-1 gap-y-6">
                {/* Courier */}
                <div>
                  <label htmlFor="courier" className="leading-6">
                    Courier
                  </label>
                  <div className="mt-2.5">
                    <Select name="courier" as={Fragment}>
                      {({ focus, hover }) => (
                        <select
                          disabled={!city.length}
                          name="courier"
                          id="courier"
                          className={`border w-full px-3.5 py-2 rounded-md border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed cursor-pointer
                      ${focus && ' bg-blue-100'}
                        ${hover && 'shadow'}`}
                          aria-label="Project status"
                          onChange={onChange}
                        >
                          <option value="">Select One</option>
                          <option value="jne">JNE</option>
                          <option value="tiki">TIKI</option>
                          <option value="pos">POS</option>
                        </select>
                      )}
                    </Select>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <label htmlFor="services" className="leading-6">
                    Services
                  </label>
                  <div className="mt-2.5">
                    <Select name="services" as={Fragment}>
                      {({ focus, hover }) => (
                        <select
                          name="services"
                          id="services"
                          disabled={!courierServices.length}
                          onChange={onChange}
                          className={`border w-full px-3.5 py-2 rounded-md border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed cursor-pointer
                      ${focus && ' bg-blue-100'}
                        ${hover && 'shadow'}`}
                          aria-label="Project status"
                        >
                          <option value="">Select Service</option>
                          {courierServices.map((courier) => (
                            <option
                              value={`${courier.service} (${courier.description})-${courier.cost[0].value}`}
                              key={courier.service}
                            >
                              {courier.service} ({courier.description}) -{' '}
                              {courier.cost[0].etd} days
                            </option>
                          ))}
                        </select>
                      )}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <h2 className="font-bold text-xl mb-4">Payment Summary</h2>

                {/* Products */}
                <div className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <div
                      className="flex justify-between opacity-50"
                      key={item.id}
                    >
                      <p>{item.name}</p>
                      <p>Rp. {item.price}</p>
                    </div>
                  ))}
                  <div className="flex justify-between opacity-50">
                    <p>Shipping Costs</p>
                    <p>Rp. {formData.shippingCost}</p>
                  </div>
                  <div className="h-0.5 w-full bg-primary"></div>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex justify-between">
                  <p className="font-bold">Total</p>
                  <p className="font-bold">Rp. {formData.total}</p>
                </div>
              </div>
              <button
                className="w-full h-12 bg-primary mt-4 rounded-lg text-white hover:bg-secondary disabled:bg-secondary disabled:cursor-not-allowed cursor-pointer"
                type="submit"
                disabled={!isValid}
              >
                Confirm Payment
              </button>
            </div>
          </form>
        </>
      )}
      <div id="snap-container" className="w-[80vw]"></div>
    </section>
  );
};

export default CheckoutPage;

'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Disclosure,
  DisclosureButton,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import Cart from './Cart';
import axios from 'axios';
import { api } from '../utils/api';
import useSnap from '../hooks/useSnap';
import { useCartContext } from '../context/CartProvider';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  // state
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // contexts
  const { snapShow } = useCartContext();

  useEffect(() => {
    const fetchData = async () => {
      const categories = await api.get(`/api/category-client`, {
        timeout: 60000,
      });
      setCategories(categories.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav">
          {({ open }) => (
            <>
              <div className="container">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex-shrink-0">
                    {!snapShow ? (
                      <Link href={'/'}>
                        <Image
                          className="h-28 w-28"
                          width={0}
                          height={0}
                          src="/logo.svg"
                          alt="Busana90s Logo"
                          priority
                        />
                      </Link>
                    ) : (
                      <Image
                        className="h-28 w-28"
                        width={0}
                        height={0}
                        src="/logo.svg"
                        alt="Busana90s Logo"
                        priority
                      />
                    )}
                  </div>
                  {!snapShow && (
                    <>
                      <div className="hidden md:block">
                        <div className="flex items-center gap-12 md:ml-6">
                          <Link
                            href={'/products'}
                            className="hover:text-primary"
                          >
                            All Products
                          </Link>
                          {/* DropDown Categories */}
                          <Menu as={'div'} className={'relative'}>
                            <div>
                              <MenuButton
                                className={
                                  'relative focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center gap-1'
                                }
                              >
                                <span>Categories</span>
                                <ChevronDownIcon className="size-4 fill-white/60" />
                              </MenuButton>
                            </div>
                            <Transition
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {!categories.length && (
                                  <MenuItem>
                                    <p>No Categories Found!</p>
                                  </MenuItem>
                                )}
                                {categories.map((item) => (
                                  <MenuItem key={item.name}>
                                    {({ active }) => (
                                      <Link
                                        href={`/products/category/?name=${item.name.toLowerCase()}`}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700',
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </MenuItem>
                                ))}
                              </MenuItems>
                            </Transition>
                          </Menu>
                          <button
                            type="button"
                            className="relative rounded-full   hover:text-primary focus:outline-none focus:ring-2 focus:ring-light focus:ring-offset-2 focus:ring-offset-light"
                            onClick={() => setOpen(true)}
                          >
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </DisclosureButton>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </Disclosure>
      </div>

      {/* Cart Sidebar */}
      <Cart open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;

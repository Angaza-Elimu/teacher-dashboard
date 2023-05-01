import { Transition, Dialog } from "@headlessui/react";
import { useRef, Fragment } from "react";

import Spinner from "../assets/Spinner";

export default function Modal({ children, isOpen, onClose, loading = false, subtitle, title }) {
  const loadingRef = useRef(null);

  return (
    <Transition appear show={isOpen} as={Fragment} static>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose ? onClose : () => null}
        initialFocus={loading ? loadingRef : null}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-dark/5 bg-opacity-25 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform rounded-2xl bg-light p-5 md:p-6 text-left align-middle shadow-xl transition-all">
                {loading && (
                  <p className="mx-auto my-2 mb-8 animate-spin-slow h-12 w-12">
                    <Spinner className="stroke-primary-700 fill-light" />
                    <span className="hidden">Loading...</span>
                  </p>
                )}

                <Dialog.Title
                  as="h3"
                  className="text-2xl md:text-3xl font-medium md:font-bold text-center leading-6 text-dark"
                  ref={loadingRef}
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2 md:w-10/12 mx-auto">
                  <p className="md:my-5 text-neutral-500 text-center text-sm md:text-base">
                    {subtitle}
                  </p>
                  {!loading && children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

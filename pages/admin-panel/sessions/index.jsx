import { useState } from 'react'
import Head from 'next/head'
import SETTINGS from "config/settings";
import { Transition } from '@headlessui/react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";

import { useSessions } from 'endpoints/session/getSessions'
import { createStandaloneToast } from "@chakra-ui/react"

import SessionListItem from 'components/Session/SessionListItem';
import SideBar from 'components/SideBar'
import Loading from "components/Loading";
import Error from "components/Error";
import { FaPlus } from "react-icons/fa";
import { Wrapper, Astrisk, ErrorMessage } from "components/Utils"

export default function AdminPanelSessionList() {

  const {isError, isLoading, data, error} = useSessions();
  const [showModal, setShowModal] = useState(false);
  const toast = createStandaloneToast();

  const onSubmit = async (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
    try {
      const res = await axios.post(`${SETTINGS.apiRoot}/session`, {
        name: values.nazwa,
        description: values.opis,
        allowedExtensions: values.rozszerzenia.split(",").map(r => r.trim()),
        start: values.start,
        end: values.koniec
      });
      if(res.status == 200) toast({
          title: "Sesja utworzona pomyślnie",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      else toast({
          title: "Tworzenie sesji się nie powiodło",
          description: "Spróbuj ponownie później",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      resetForm({})
      setStatus({success: true})
    } catch (error) {
      setStatus({success: false})
      setSubmitting(false)
      setErrors({submit: error.message})
    }
    finally{
      setShowModal(false)
    }
}

  const validation = yup.object().shape({
    nazwa: yup.string()
      .max(50, 'Maksymalnie 50 znaków')
      .required('Wymagane pole'),
    opis: yup.string()
      .max(250, 'Zbyt długi opis, maksymalnie 250 znaków'),
    rozszerzenia: yup.string()
      .max(100, 'Zbyt długi ciąg dozwolonych rozszerzeń')
      .min(1, "Nie wybrano żadnego rozszerzenia")
      .matches(/[^,]+/, "Rozszerzenia muszą być rodzielone przecinkiem")
      .required('Wymagane pole'),
    start: yup.date()
      .min(new Date(), "Nie można zacząć sesji w przeszłości")
      .required('Wymagane pole'),
    koniec: yup.date()
      .min(yup.ref("start"), "Koniec nie może być przed początkiem")
      .required('Wymagane pole')
  });

  const formik = useFormik({
    initialValues: {
      nazwa: "",
      opis: "",
      rozszerzenia: "",
      start: "",
      koniec: ""
    },
    validationSchema: validation,
    onSubmit: onSubmit
  })

  if (isError)
    return <Error error={error}/>

  if (isLoading)
    return (
      <Wrapper>
        <Loading/>
      </Wrapper>
    )

  return (
    <div className="flex">
      <Head>
        <title>Admin Panel - Sessions</title>
      </Head>

      <SideBar/>
      
      <div className="mx-auto w-1/2 max-w-4xl mt-16">
        <div className="flex justify-between w-full">
          <h1 className="font-bold text-gray-700 text-4xl">Sesje</h1>
          <a className="bg-gray-200 p-2 rounded-md w-8 h-8 hover:bg-gray-300 cursor-pointer" onClick={() => setShowModal(true)}>
            <FaPlus size="1em"/>
          </a>
        </div>
          {data.map(m => (
            <>
              <h1 className="mt-8 mb-4 text-gray-600">{m.year}</h1>
              <div className="space-y-5">
                {m.sessions.map(s => <SessionListItem title={s.name} from={s.start} to={s.end} id={s.id}/>)}
              </div>
            </>
          ))}
          <Transition 
            show={showModal}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            {
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-95"></div>
              </div>
            }
          </Transition>
          <div className={`fixed z-10 ${showModal ? "visable": "hidden"}` } style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            
          <Transition
            show={showModal}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95"
          >
            {
              <div className="inline-block bg-white rounded-xl overflow-hidden shadow-xl transform transition-all w-full max-w-2xl" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-white px-8 pt-10 pb-4 w-full">
                  <h1 className="text-xl font-bold text-gray-500">Utwórz sesję</h1>
                  <div id="content" className="my-8 w-full">
                      <form id="newSessionForm" className="w-full space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                      }}>
                        <div>
                          <label className="text-gray-400 font-light text-sm" for="nazwa">Nazwa sesji<Astrisk/></label>
                          <input id="nazwa" name="nazwa" required value={formik.values.nazwa} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            className={`bg-gray-100 px-4 py-2 rounded-md text-sm w-full mt-1 shadow-md text-gray-500 focus:outline-none ${formik.touched.nazwa && formik.errors.nazwa ? "border-2 border-red-600": ""}`}/>
                          {formik.touched.nazwa && formik.errors.nazwa ? <ErrorMessage msg={formik.errors.nazwa}/> : null}
                        </div>

                        <div>
                          <label className="text-gray-400 font-light text-sm" for="opis">Opis sesji</label>
                          <textarea id="opis" name="opis" rows={4} style={{maxHeight: "15rem", minHeight: "3rem"}} value={formik.values.opis} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            className={`bg-gray-100 px-4 py-2 rounded-md text-sm w-full mt-1 shadow-md text-gray-500 focus:outline-none ${formik.touched.opis && formik.errors.opis ? "border-2 border-red-600": ""}`}/>
                          {formik.touched.opis && formik.errors.opis ? <ErrorMessage msg={formik.errors.opis}/>: null}
                        </div>

                        <div>
                          <label className="text-gray-400 font-light text-sm" for="rozszerzenia">Dozwolone rozszerzenia<Astrisk/></label>
                          <input id="rozszerzenia" name="rozszerzenia" placeholder="py, java, cpp" required value={formik.values.rozszerzenia} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            className={`bg-gray-100 px-4 py-2 rounded-md text-sm w-full mt-1 shadow-md text-gray-500 focus:outline-none ${formik.touched.rozszerzenia && formik.errors.rozszerzenia ? "border-2 border-red-600": ""}`}/>
                          {formik.touched.rozszerzenia && formik.errors.rozszerzenia ? <ErrorMessage msg={formik.errors.rozszerzenia}/>: null}
                        </div>

                        <div className="flex w-full space-x-8">

                          <div className="flex flex-col w-1/2">
                            <label className="text-gray-400 font-light text-sm" for="start">Rozpoczęcie sesji<Astrisk/></label>
                            <input id="start" name="start" type="datetime-local" required value={formik.values.start} onChange={formik.handleChange} onBlur={formik.handleBlur}
                              className={`bg-gray-100 px-4 py-2 rounded-md text-sm w-full mt-1 shadow-md text-gray-500 focus:outline-none ${formik.touched.start && formik.errors.start ? "border-2 border-red-600": ""}`} />
                            {formik.touched.start && formik.errors.start ? <ErrorMessage msg={formik.errors.start}/>: null}
                          </div>

                          <div className="flex flex-col w-1/2">
                            <label className="text-gray-400 font-light text-sm" for="koniec">Zakończenie sesji<Astrisk/></label>
                            <input id="koniec" name="koniec" type="datetime-local" required value={formik.values.koniec} onChange={formik.handleChange} onBlur={formik.handleBlur}
                              className={`bg-gray-100 px-4 py-2 rounded-md text-sm w-full mt-1 shadow-md text-gray-500 focus:outline-none ${formik.touched.koniec && formik.errors.koniec ? "border-2 border-red-600": ""}`} />            
                            {formik.touched.koniec && formik.errors.koniec ? <ErrorMessage msg={formik.errors.koniec}/>: null}
                          </div>

                        </div>

                      </form>
                  </div>
                </div>
                <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" form="newSessionForm"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Zapisz
                  </button>
                  <button type="button" onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Anuluj
                  </button>
                </div>
              </div>
            }
          </Transition>
        </div>
      </div>
    </div>
  )
}

export const Wrapper = (props) => <div className="my-6 sm:mx-0 rounded-2xl bg-white shadow-lg p-6 whitespace-pre-wrap" {...props} />

export const Astrisk = () => <span className="text-red-600 ">*</span>

export const ErrorMessage = ({msg}) => <div className="w-full text-center text-red-600 mt-2 text-xs font-thin opacity-75">{msg}</div>
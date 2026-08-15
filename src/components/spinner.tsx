export function Spinner() {
     return (

          <div className="h-screen flex items-center justify-center">
               <div className="flex items-center justify-center">
                    <div className="w-11 h-11 border-5 border-gray-200 border-t-(--color-primary) rounded-full animate-spin" />
               </div>
          </div>
     )
}
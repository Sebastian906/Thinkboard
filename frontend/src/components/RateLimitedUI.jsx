import { ZapIcon } from 'lucide-react'

const RateLimitedUi = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className=" bg-orange-500/10 border border-orange-500/30 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-center p-6">
                    <div className="flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                        <ZapIcon className="size-10 text-orange-500" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold mb-2">Límite de solicitudes alcanzado</h3>
                        <p className="text-base-content mb-1">
                            Has realizado demasiadas solicitudes en un corto período. Por favor, espera un momento.
                        </p>
                        <p className="text-sm text-base-content/70">
                            Intenta de nuevo en unos segundos para una mejor experiencia.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RateLimitedUi
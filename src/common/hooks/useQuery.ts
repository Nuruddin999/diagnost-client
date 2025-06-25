import {useEffect, useState} from "react";

export const useQuery = <T>(cb:()=>Promise<T>) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T | null>();

    const handleFetch=async ()=>{
        setLoading(true);
        try {
            const result = await cb();
           setData(result);
        }
        catch(err){

        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
handleFetch();
    },[])

    return {loading, data}


}
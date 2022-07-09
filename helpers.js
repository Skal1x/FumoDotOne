import { createClient } from 'contentful';
import { useCallback, useEffect, useState } from 'react';

export const getContent = async (name, layers = 3) => {
    try {

        const client = createClient({
            space: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_API_KEY,
            resolveLinks: true
        })

        const result = JSON.parse((await client.getEntries({ content_type: name, include: layers})).stringifySafe())

        return {
            success: true,
            error: null,
            result
        }

    } catch (e) {

        console.log(e);

        return {
            success: false,
            error: e.message,
            result: null
        }
    }
}

export const getImageUrl = (image) => {
    return image?.fields?.file?.url !== undefined ? "https:" + image.fields.file.url : '/images/placeholder.webp';
}

export const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
        if (e.matches) {
            setTargetReached(true);
        } else {
            setTargetReached(false);
        }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`)
      media.addEventListener('change', e => updateTarget(e))

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
          setTargetReached(true)
      }

      return () => media.removeEventListener('change', e => updateTarget(e))
    }, [updateTarget, width])

    return targetReached;
};

export const clamp = (val, min = 0, max = 1) => Math.max(min, Math.min(max, val));
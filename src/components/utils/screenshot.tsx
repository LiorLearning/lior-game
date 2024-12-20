import html2canvas from 'html2canvas';

export const handleScreenshot = (pageRef: React.RefObject<HTMLDivElement>) => {
    if (pageRef.current) {
        return html2canvas(pageRef.current).then(canvas => {
            const dataUrl = canvas.toDataURL("image/png");
            return dataUrl;
        }).catch(error => {
            console.error('Error generating screenshot', error);
            return null;
        });
    }
    return Promise.resolve(null);
};

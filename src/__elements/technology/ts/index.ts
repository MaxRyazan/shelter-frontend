import {CSSProperties, Ref, ref} from "vue";

export const nodeStyles = ref({
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    width: '90px',
    height: '50px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '5px 5px 15px rgba(0,0,0,0.3), inset 0 -3px 8px rgba(0,0,0,0.2), inset 0 3px 8px rgba(255,255,255,0.2)',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    fontSize: '11px',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    padding: '4px',
    textAlign: 'center',
    hyphens: 'auto',
    cursor: 'pointer',
}) as Ref<CSSProperties>
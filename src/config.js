export const CONFIG = {
    starCount: 200,
    pageTransitionSpeed: 600,
    bgEffects: {
        home: { photo: 'bg_gold_nebula.jpg', brightness: 0.45, blur: '0px', scale: 1.1, rotate: '0deg' },
        about: { photo: 'bg_deep_blue.jpg', brightness: 0.4, blur: '3px', scale: 1.2, rotate: '5deg' },
        navigators: { photo: 'bg_cyan_milkyway.jpg', brightness: 0.5, blur: '1px', scale: 1.05, rotate: '-2deg' },
        architects: { photo: 'bg_gold_nebula.jpg', brightness: 0.45, blur: '1px', scale: 1.1, rotate: '-5deg' },
        register: { photo: 'bg_deep_blue.jpg', brightness: 0.35, blur: '6px', scale: 1.25, rotate: '10deg' }
    },
    nebulaColors: {
        home: 'radial-gradient(circle at 50% 50%, rgba(255, 204, 0, 0.1), transparent)',
        about: 'radial-gradient(circle at 30% 30%, rgba(255, 204, 0, 0.05), transparent)',
        navigators: 'radial-gradient(circle at 70% 70%, rgba(255, 204, 0, 0.08), transparent)',
        architects: 'radial-gradient(circle at 20% 80%, rgba(255, 204, 0, 0.05), transparent)',
        register: 'radial-gradient(circle at 80% 20%, rgba(255, 204, 0, 0.1), transparent)'
    },
    googleSheetsUrl: import.meta.env.VITE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxDORytuBPfno6tlmT5Unb2pwiXb1o-2yz2_iT1vmtEVeQ-vTSTLesYNsk7Z8L6Bm0QlQ/exec'
};

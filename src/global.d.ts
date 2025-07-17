import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

declare module "*.glb" {
  const value: string;
  export default value;
}

declare module "*.gltf" {
  const value: string;
  export default value;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: React.DetailedHTMLProps<any, any>;
    }
  }

  interface Window {
    voiceflow?: {
      chat?: {
        open: () => void;
        load?: (config: any) => void;
      };
    };
  }
}

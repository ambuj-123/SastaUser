import { Dimensions, Platform } from 'react-native';

const dimension = Dimensions.get('window');
export const imageHeight = () => {
  return Math.round(dimension.width * 9 / 16);
}

export const imageWidth = () => {
  return dimension.width;
}
export const getallWindowsSize = (_type) => {
    try {
        switch (_type) {
            case 'w':
                return (Dimensions.get('window').width);
            case 'h':
                return (Dimensions.get('window').height);
            default:
                throw 'Not compatible size';
            }
    } catch (error) {
        console.log(error);
    }
}
export const getWindowsSize = (_type, _size) => {
    try {
        switch (_type) {
            case 'w':
                return (Dimensions.get('window').width - (Dimensions.get('window').width - _size));
            case 'h':
                return (Dimensions.get('window').height - (Dimensions.get('window').height - _size));
            default:
                throw 'Not compatible size';
            }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Perro : tardé caleta en ecnontrar esta solución reza por mi  francisco
 */
export const PlatformCompatibility = (numberi) => {
    try {
        if (Platform.OS === 'ios') {
            return { zIndex: numberi };
        }
        return { elevation: numberi }
    } catch (error) {
        throw error;
    }
}

export const resizeTextDrop = (io) => {
    try {
        if (io <= 20) {
            return 20
        }

        if (io >= 20 && io <= 30) {
            return 14
        }

        if (io > 30) {
            return 12
        }

    } catch (error) {
        throw error;
    }
}


export const navResize = ({ small, medium, large, type }) => { 
    switch (type) {
    case 'height':
        if (Dimensions.get('window').height <= 600) {
            return small;
        }
        if (Dimensions.get('window').height < 800) {
            return medium;
        }
        if (Dimensions.get('window').height >= 800) {
            return large;
        }
    case 'width':
        if (Dimensions.get('window').width <= 320) {
            return small;
        }
        if (Dimensions.get('window').width <= 400) {
            return medium;
        }
        if (Dimensions.get('window').width > 400) {
            return large;
        }
        return large;
    }
}

export const navReponsive = (small, medium, large, xlarge) => {
    if (Dimensions.get('window').height >= 0 && Dimensions.get('window').height < 600) {
        return small;
    }
    if (Dimensions.get('window').height > 600 && Dimensions.get('window').height < 800) {
        return medium;
    }
    if (Dimensions.get('window').height > 800 && Dimensions.get('window').height < 900) {
        return large;
    }
    if (Dimensions.get('window').height > 900) {
        return xlarge;
    }
}


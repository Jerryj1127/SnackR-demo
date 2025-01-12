// storageManager.test.js

import { getStorageItem, setStorageItem , removeItem } from '../src/storageManager';

// Mocking AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
}));

describe('storageManager', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getStorageItem', () => {
        // as per documentaions, values are to be stored as string.
        // case: when user tries to read a stored a stored JSON
        it('should return parsed JSON if item exists', async () => {
          const mockData = { streak: '3', lastlogin: "2025-01-01" };
          require('@react-native-async-storage/async-storage').getItem.mockResolvedValueOnce(JSON.stringify(mockData));

          const result = await getStorageItem('testKey');
          
          expect(result).toEqual(mockData);
          expect(require('@react-native-async-storage/async-storage').getItem).toHaveBeenCalledWith('testKey');
        });

        // case when user tries to read integer that has been stored as string
        it('should return parsed Int if it exists', async () => {
          const mockData = 123;
          require('@react-native-async-storage/async-storage').getItem.mockResolvedValueOnce(JSON.stringify(mockData));

          const result = await getStorageItem('testKey');
          
          expect(result).toEqual(mockData);
          expect(require('@react-native-async-storage/async-storage').getItem).toHaveBeenCalledWith('testKey');
        });


        // useless case , but for the sake of tesing
        it('should return parsed String value if it exists', async () => {
          const mockData = "Hello World";
          require('@react-native-async-storage/async-storage').getItem.mockResolvedValueOnce(JSON.stringify(mockData));

          const result = await getStorageItem('testKey');
          
          expect(result).toEqual(mockData);
          expect(require('@react-native-async-storage/async-storage').getItem).toHaveBeenCalledWith('testKey');
        });

        // case value for a key doesnt exist and returns null
        it('should return null if item does not exist', async () => {
          require('@react-native-async-storage/async-storage').getItem.mockResolvedValueOnce(null);

          const result = await getStorageItem('testKey');

          expect(result).toBeNull();
          expect(require('@react-native-async-storage/async-storage').getItem).toHaveBeenCalledWith('testKey');
        });

        // case handling error when trying to read from disk
        it('should handle errors', async () => {
          require('@react-native-async-storage/async-storage').getItem.mockRejectedValueOnce(new Error('AsyncStorage error'));

          const result = await getStorageItem('testKey');

          expect(result).toBeNull();
          expect(require('@react-native-async-storage/async-storage').getItem).toHaveBeenCalledWith('testKey');
        });
      });


  
  describe('setStorageItem', () => {

        // case when trying to write JSON
        it('should write JSON value onto disk', async () => {
          const mockData = { streak: '3', lastlogin: "2025-01-01" };

          require('@react-native-async-storage/async-storage').setItem.mockResolvedValueOnce();

          await setStorageItem('testKey', mockData);

          expect(require('@react-native-async-storage/async-storage').setItem).toHaveBeenCalledWith('testKey', JSON.stringify(mockData));
        });

        // case when trying to write Integer
        it('should write Integer value onto disk', async () => {
          const mockData = { streak: '3', lastlogin: "2025-01-01" };

          require('@react-native-async-storage/async-storage').setItem.mockResolvedValueOnce();

          await setStorageItem('testKey', mockData);

          expect(require('@react-native-async-storage/async-storage').setItem).toHaveBeenCalledWith('testKey', JSON.stringify(mockData));
        });

        // useless case , but for the sake of tesing
        it('should store String onto disk', async () => {
          const mockData = { streak: '3', lastlogin: "2025-01-01" };

          require('@react-native-async-storage/async-storage').setItem.mockResolvedValueOnce();

          await setStorageItem('testKey', mockData);

          expect(require('@react-native-async-storage/async-storage').setItem).toHaveBeenCalledWith('testKey', JSON.stringify(mockData));
        });

        // case handling error when trying to write to disk
        it('should handle errors', async () => {

          const mockData = "this is definitely going to fail";
      
          require('@react-native-async-storage/async-storage').setItem.mockRejectedValueOnce(new Error('AsyncStorage error'));
      
          await setStorageItem('testKey', mockData);
          const storedValue = await getStorageItem('testKey');

          expect(storedValue).toBeNull(); // value should be null as error occured while trying to write 
          expect(require('@react-native-async-storage/async-storage').setItem).toHaveBeenCalledWith('testKey', JSON.stringify(mockData));
        });
      
    });

  describe('removeItem', () => {
    
      it('should call removeItem with the a valid key', async () => {
        const mockData = "this value will get deleted soon"

        require('@react-native-async-storage/async-storage').setItem.mockRejectedValueOnce(new Error('AsyncStorage error'));
        await setStorageItem('testKey', mockData);
        
        require('@react-native-async-storage/async-storage').removeItem.mockResolvedValueOnce();
        await removeItem('testKey');

        const storedValue = await getStorageItem('testKey');
        expect(storedValue).toBeNull();
    
        expect(require('@react-native-async-storage/async-storage').removeItem).toHaveBeenCalledWith('testKey');
      });
    
      
    });
});

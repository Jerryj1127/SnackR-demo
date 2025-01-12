import { getCoinCount, incrementCoinCount, decrementCoinCount } from '../src/CoinTracker';
import { getStorageItem, setStorageItem } from '../src/storageManager';


jest.mock('../src/storageManager', () => ({
  getStorageItem: jest.fn(),
  setStorageItem: jest.fn(),
}));

describe('coinTracker', () => {
  beforeEach(() => {
    jest.clearAllMocks();  
  });

    // 250 coins for new users 
    it('should returns default coin count no preexising values found on disk', async () => {

      getStorageItem.mockResolvedValueOnce(null); 
      const count = await getCoinCount();
      expect(count).toBe(250); 
    });

    //  returns coin count
    it('should return stored coin count if it exists', async () => {

      getStorageItem.mockResolvedValueOnce(500);
      const count = await getCoinCount();
      expect(count).toBe(500);
    });

    // normal addition; eg : adding rewards
    it('should increment coin count', async () => {

      getStorageItem.mockResolvedValueOnce(250);
      setStorageItem.mockResolvedValueOnce();

      const newCount = await incrementCoinCount(100);
      expect(newCount).toBe(350);
      expect(setStorageItem).toHaveBeenCalledWith('coinCount', 350);
    });


    //normal coin deduction
    it('should decrement coin count correctly when sufficient coins are available', async () => {

      getStorageItem.mockResolvedValueOnce(100);
      setStorageItem.mockResolvedValueOnce();

      const newCount = await decrementCoinCount(50);
      expect(newCount).toBe(50);
      expect(setStorageItem).toHaveBeenCalledWith('coinCount', 50);
    });


    //eg balance is 250 and tries to make a purchase of 300
    it('should throw an error if sufficient coins are unavailable', async () => {
      getStorageItem.mockResolvedValueOnce(250);

      await expect(decrementCoinCount(300)).rejects.toThrow('Insufficient coins');
      expect(setStorageItem).not.toHaveBeenCalled();
    });

    
});

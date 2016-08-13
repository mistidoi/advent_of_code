import Data.List

main = do
    let input = [33,14,18,20,45,35,16,35,1,13,18,13,50,44,48,6,24,41,30,42]
    let total = 150
    let combinations_summing_to_total = [x | x <- allCombinations input, sum x == total]
    putStrLn "Solution to part 1:"
    print $ length $ combinations_summing_to_total

    let minimum_number_of_cups = minimum $ map length combinations_summing_to_total
    let solutions_with_minimum = filter (\x -> length x == minimum_number_of_cups) combinations_summing_to_total
    putStrLn "Solution to part 2:"
    print $ length solutions_with_minimum

allCombinations :: [a] -> [[a]]
allCombinations [] = [[]]
allCombinations [x] = [[x]]
allCombinations (x:xs) = (appendToEach x (allCombinations xs)) ++ allCombinations xs ++ [[x]]

appendToEach :: a -> [[a]] -> [[a]]
appendToEach number_to_be_added array_of_arrays = map (\y -> number_to_be_added:y) array_of_arrays


import Data.List

main = do
    let input = [33,14,18,20,45,35,16,35,1,13,18,13,50,44,48,6,24,41,30,42]
    let total = 150
    let combinations_summing_to_total = [x | x <- powerSet input, sum x == total]
    putStrLn "Solution to part 1:"
    print $ length $ combinations_summing_to_total

    let minimum_number_of_cups = minimum $ map length combinations_summing_to_total
    let solutions_with_minimum = filter (\x -> length x == minimum_number_of_cups) combinations_summing_to_total
    putStrLn "Solution to part 2:"
    print $ length solutions_with_minimum

powerSet :: [a] -> [[a]]
powerSet [x] = [[x]]
powerSet (x:xs) = [[x]] ++ map (x:) (powerSet xs) ++ powerSet xs

-- I've since learned that this is called a power set.
--
-- Well actually, the power set includes the empty set, but it
-- probably still would have helped me a lot if I knew what it was
-- called.
--
-- In English, the power set of a list of elements
-- can be defined recursively as:
-- the list containing first element of the list
-- plus the solution to the rest of the list
-- plus a copy of the solution to the rest of the list with the first element appended to each previous subset.


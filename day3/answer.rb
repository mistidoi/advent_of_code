File.open("input.txt").readlines.each do |line|

  moves_from_file = line.chomp.split("")

  moves1 = []
  moves2 = []

  moves_from_file.each_with_index do |element, index|
    if index % 2 == 1
      moves1 << element
    else
      moves2 << element
    end
  end

  starting_coords = [0, 0]

  move_functions = {
      :^ => -> (coords) { [coords[0], (coords[1] + 1)] },
      :v => -> (coords) { [coords[0], (coords[1] - 1)] },
      :> => -> (coords) { [(coords[0] + 1), coords[1]] },
      :< => -> (coords) { [(coords[0] - 1), coords[1]] },
  }
  positions = -> (moves) do
    moves.inject([starting_coords]) do |agg, move|
      agg << move_functions[move.to_sym].call(agg.last)
    end
  end

  puts positions.call(moves1).concat(positions.call(moves2)).uniq.length

end


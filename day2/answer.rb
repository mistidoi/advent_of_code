class Present < Struct.new(:l, :w, :h)
  def amount_of_paper_needed
    (2 * l.value * w.value + 2 * w.value * h.value + 2 * h.value * l.value) + area_of_smallest_side
  end

  def area_of_smallest_side
    all_sides.map { |side| side[0].value * side[1].value }.min
  end

  def all_sides
    [l, w, h].product([l, w, h]).reject { |guy| guy[0].type == guy[1].type }
  end

  def sorted_sides
    [l, w, h].sort {|x,y| x.value <=> y.value}
  end

  def amount_of_ribbon_needed
    perimeter_of_smallest_side + cubic_volume
  end

  def perimeter_of_smallest_side
    sorted_sides[0..1].map { |x| x.value * 2 }.reduce(:+)
  end

  def cubic_volume
    [l, w, h].map {|x| x.value}.reduce(:*)
  end

end

class Dimension < Struct.new(:type, :value); end

#
# # tests
# present = Present.new(Dimension.new("l", 2),
#                       Dimension.new("w", 3),
#                       Dimension.new("h", 4))
# puts present.amount_of_paper_needed
# # puts "should == 58"
# puts Present.new(Dimension.new("l", 1),
#                  Dimension.new("w", 1),
#                  Dimension.new("h", 10)).amount_of_paper_needed
# # puts "should == 43"


presents = File.open("input.txt").readlines.inject([]) do |agg, line|
  dimensions = line.split("x").map(&:to_i)
  agg << Present.new(Dimension.new("l", dimensions[0]),
                     Dimension.new("w", dimensions[1]),
                     Dimension.new("h", dimensions[2]))
end

amount = presents.map(&:amount_of_ribbon_needed).reduce(:+)
puts "final answer:"
puts amount


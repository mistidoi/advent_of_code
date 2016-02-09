require 'pp'
getCurrentPosition = -> (current_time, reindeer) do
  (((current_time / reindeer.period).floor * reindeer.go_period) * reindeer.speed) +
      ([(current_time % reindeer.period), reindeer.go_period].min * reindeer.speed)
end

class Reindeer < Struct.new(:name, :go_period, :rest_period, :speed)

  def self.from_line(line)
    match_groups = line.match(/(.+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\./)
    reindeer = new
    reindeer.name = match_groups[1]
    reindeer.speed = match_groups[2].to_i
    reindeer.go_period = match_groups[3].to_i
    reindeer.rest_period = match_groups[4].to_i
    reindeer
  end

  def period
    go_period + rest_period
  end
end

reindeers = File.open("input.txt").readlines.inject([]) do |agg, line|
  agg << Reindeer.from_line(line)
end

# question 1
puts reindeers.map { |reindeer| getCurrentPosition.call(2503, reindeer) }.max

# question 2

max_reindeer_position = -> (reindeer_positions) do
  reindeer_positions.map { |reindeer_position| reindeer_position[1] }.max
end

getWinningReindeers = -> (reindeer_positions) do
  reindeer_positions
      .select { |reindeer_position| reindeer_position[1] == max_reindeer_position.call(reindeer_positions) }
end

getWinningReindeerSets = (1..2503).inject([]) do |acc, current_time|
  reindeer_positions = reindeers
                           .map { |reindeer| [reindeer.name, getCurrentPosition.call(current_time, reindeer)] }
  acc << getWinningReindeers.call(reindeer_positions)
end

reindeer_scores = getWinningReindeerSets.inject({}) do |agg, winning_reindeer_set|
  winning_reindeer_set.each do |winner|
    agg[winner[0]] ||= 0
    agg[winner[0]] = agg[winner[0]] + 1
  end
  agg
end

pp reindeer_scores

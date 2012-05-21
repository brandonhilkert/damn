require 'open-uri'

module Damn
  module List
    def self.scrape_lists
      doc = Nokogiri::HTML(open('http://www.damnyouautocorrect.com/'))

      doc.css('ul#sidebar div a').each do |link|
        a_content = link.content.strip

        unless a_content.empty?

          href = link["href"]
          best_of = Nokogiri::HTML(open(href))
          key = a_content.downcase.split.join("-")

          best_of.css('.body img').each do |image|
            Damn.redis.sadd "#{Damn::App.redis_namespace}#{key}", image["src"]
          end
        end

      end
    end

  end
end
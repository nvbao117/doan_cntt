from langchain_core.tools import tool
@tool
def search_web(query: str):
    """Tìm kiếm thông tin trên internet."""
    # Logic gọi API search (ví dụ Tavily hoặc Google)
    return f"Kết quả tìm kiếm giả lập cho: {query}"
@tool
def get_weather(city: str):
    """Lấy thông tin thời tiết."""
    return f"Thời tiết tại {city} là 25 độ C."
tools = [search_web, get_weather]
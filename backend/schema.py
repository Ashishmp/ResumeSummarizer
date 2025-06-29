from pydantic import BaseModel

class DocumentOut(BaseModel):
    filename: str
    summary: str

    class Config:
        orm_mode = True
